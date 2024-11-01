import pool from "./conexao";

export async function consultar_entrada() {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query(
    `SELECT P.nome, E.quantidade, E.data_entrada FROM estoque.produto P INNER JOIN estoque.entradas E ON P.id = E.id_produto`
  );

  conexao.release();

  return resultado;
}
