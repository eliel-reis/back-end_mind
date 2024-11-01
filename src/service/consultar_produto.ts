import pool from "./conexao";

export async function consultar_produto() {
  const conexao = await pool.getConnection();

  const [resposta] = await conexao.query(`SELECT * FROM estoque.produto`);

  conexao.release();

  return resposta;
}
