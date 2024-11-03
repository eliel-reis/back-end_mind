import pool from "./conexao";

export async function consultar_saida() {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query(
    `SELECT P.nome, S.quantidade, YEAR(S.data_saida) AS ano, LPAD(MONTH(S.data_saida), 2, "0" ) AS mes, LPAD(DAY(S.data_saida), 2, "0" ) AS dia FROM estoque.produto P INNER JOIN estoque.saidas S ON P.id = S.id_produto`
  );

  conexao.release();

  return resultado;
}
