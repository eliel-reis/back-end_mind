import pool from "./conexao";

export async function consultar_saida() {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query(
    `SELECT P.nome, S.quantidade, S.data_saida FROM estoque.produto P INNER JOIN estoque.saidas S ON P.id = S.id_produto`
  );

  conexao.release();

  return resultado;
}
