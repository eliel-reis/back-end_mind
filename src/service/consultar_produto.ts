import pool from "./conexao";

export async function consultar_produto() {
  const conexao = await pool.getConnection();

  const [resposta] = await conexao.query(
    `SELECT P.nome, P.descricao, P.imagem, P.valor, E.quantidade FROM estoque.produto P INNER JOIN estoque.estoque E ON P.id = E.id_produto`
  );
  conexao.release();

  return resposta;
}
