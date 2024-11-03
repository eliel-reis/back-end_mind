import pool from "./conexao";
import { ResultSetHeader } from "mysql2";

export async function cadastrar_produto(
  nome: string,
  descricao: string,
  imagem: string,
  valor: number
): Promise<void> {
  const conexao = await pool.getConnection();
  console.log(nome, descricao, imagem, valor);
  try {
    const [resultado] = await conexao.query<ResultSetHeader>(
      `INSERT INTO estoque.produto (nome, descricao, imagem, valor) VALUES (?, ?, ?, ?)`,
      [nome, descricao, imagem, valor]
    );

    const id_produto = resultado.insertId;

    await conexao.query(
      `INSERT INTO estoque.estoque (quantidade, id_produto) VALUES (?,?)`,
      [0, id_produto]
    );
  } catch (error) {
    console.error("Erro ao cadastrar produto: ", error);
  } finally {
    conexao.release();
  }
}
