import pool from "./conexao";

export default async function Confirmar_Login(
  usuario: string,
  senha: string
): Promise<boolean> {
  const conexao = await pool.getConnection();

  const [resultado] = await conexao.query<any>(
    `SELECT usuario, senha FROM estoque.login`
  );

  const dados = resultado.map((dado: { usuario: string; senha: string }) => ({
    usuario: dado.usuario,
    senha: dado.senha,
  }));

  const resultado_final =
    dados[0].usuario == usuario && dados[0].senha == senha;

  conexao.release();

  return resultado_final;
}
