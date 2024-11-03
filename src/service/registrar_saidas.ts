import pool from "./conexao";

export async function registrar_saida(
  nome: string,
  quantidade: number
): Promise<void> {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query<any[]>(
    `SELECT id FROM estoque.produto WHERE nome = ?`,
    [nome]
  );

  const id_produto = resultado[0].id;

  await conexao.query(
    `INSERT INTO estoque.saidas (quantidade, id_produto) VALUES (?, ?)`,
    [quantidade, id_produto]
  );

  await conexao.query(
    `UPDATE estoque.estoque SET quantidade = quantidade - ? WHERE id_produto = ?`,
    [quantidade, id_produto]
  );

  conexao.release();
}
