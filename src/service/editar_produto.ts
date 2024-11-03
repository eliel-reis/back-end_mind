import pool from "./conexao";
import { ResultSetHeader } from "mysql2";

export async function editar_produto(
  nome: string,
  descricao: string,
  imagem: string,
  valor: number
) {
  const conexao = await pool.getConnection();

  await conexao.query<ResultSetHeader>(
    `UPDATE estoque.produto SET nome = ?, descricao = ?, imagem = ?, valor = ? WHERE nome LIKE ?`,
    [nome, descricao, imagem, valor, nome]
  );
  conexao.release();
}
