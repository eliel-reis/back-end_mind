import pool from "./conexao";

export async function deletar_produto(nome: string) {
  const conexao = await pool.getConnection();

  await conexao.query(`DELETE FROM estoque.produto WHERE nome LIKE ?`, [nome]);

  conexao.release();
}
