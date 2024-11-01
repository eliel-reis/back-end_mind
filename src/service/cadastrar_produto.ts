import pool from "./conexao";

export async function cadastrar_produto(
  nome: string,
  descricao: string,
  imagem: string,
  valor: number
): Promise<void> {
  const conexao = await pool.getConnection();

  try {
    await conexao.query(
      `INSERT INTO estoque.produto (nome, descricao, imagem, valor) VALUES (?, ?, ?, ?)`,
      [nome, descricao, imagem, valor]
    );
  } catch (error) {
    console.error("Erro ao cadastrar produto: ", error);
  } finally {
    conexao.release();
  }
}
