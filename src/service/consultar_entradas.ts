import pool from "./conexao";

export async function consultar_entrada() {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query(
    `SELECT P.nome, E.quantidade, YEAR(E.data_entrada) AS ano, LPAD(MONTH(E.data_entrada), 2, "0" )AS mes, LPAD(DAY(E.data_entrada), 2, "0" )AS dia FROM estoque.produto P INNER JOIN estoque.entradas E ON P.id = E.id_produto`
  );

  conexao.release();

  return resultado;
}
