import pool from "./conexao";

export async function editar_produto(
  nome: string,
  descricao: string,
  imagem: string,
  valor: number,
  id: number
) {
  const conexao = await pool.getConnection();

  await conexao.query(
    `UPDATE estoque.produto SET nome = ?, descricao = ?, imagem = ?, valor = ? WHERE id = ?`,
    [nome, descricao, imagem, valor, id]
  );

  conexao.release();
}
