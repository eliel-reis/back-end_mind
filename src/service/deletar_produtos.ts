import pool from "./conexao";

export async function deletar_produto(id: number) {
  const conexao = await pool.getConnection();

  await conexao.query(`DELETE FROM estoque.produto WHERE id = ?`, [id]);

  conexao.release();
}
