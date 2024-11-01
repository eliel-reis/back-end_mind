import pool from "./conexao";

export async function registrar_entrada(
  id_produto: number,
  quantidade: number
): Promise<void> {
  const conexao = await pool.getConnection();

  await conexao.query(
    `INSERT INTO estoque.entradas (id_produto, quantidade) VALUES (?, ?)`,
    [id_produto, quantidade]
  );

  await conexao.query(
    `UPDATE estoque.estoque SET quantidade = quantidade + ? WHERE id_produto = ?`,
    [quantidade, id_produto]
  );

  conexao.release();
}
