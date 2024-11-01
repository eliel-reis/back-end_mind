import express from "express";
import { cadastrar_produto } from "./service/cadastrar_produto";
import { consultar_produto } from "./service/consultar_produto";
import { editar_produto } from "./service/editar_produto";
import { deletar_produto } from "./service/deletar_produtos";
import { registrar_entrada } from "./service/registrar_entradas";
import { registrar_saida } from "./service/registrar_saidas";
import { consultar_entrada } from "./service/consultar_entradas";
import { consultar_saida } from "./service/constultar_saidas";

const app = express();

app.use(express.json());

app.post("/cadastrar_produtos", async (req, res) => {
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  const imagem = req.body.imagem;
  const valor = req.body.valor;

  try {
    await cadastrar_produto(nome, descricao, imagem, valor);
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao cadastrar produto: ", error);
    res.status(400).send({ error: "Produto inválido" });
  }
});

app.get("/", async (req, res) => {
  const resposta = await consultar_produto();

  res.json(resposta);
});

app.put("/editar_produtos/:id", async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  const imagem = req.body.imagem;
  const valor = req.body.valor;

  await editar_produto(nome, descricao, imagem, valor, parseInt(id));
  res.status(204).end();
});

app.delete("/deletar_produtos/:id", async (req, res) => {
  const id = req.params.id;

  await deletar_produto(parseInt(id));
  res.status(204).end();
});

app.post("/entrada_produtos", async (req, res) => {
  const id_produto = req.body.id_produto;
  const quantidade = req.body.quantidade;

  await registrar_entrada(id_produto, quantidade);
  res.status(204).end();
});

app.post("/saida_produtos", async (req, res) => {
  const id_produto: number = req.body.id_produto;
  const quantidade: number = req.body.quantidade;

  await registrar_saida(id_produto, quantidade);
  res.status(204).end();
});

app.get("/consultar_entradas", async (req, res) => {
  const resposta = await consultar_entrada();

  res.json(resposta);
});

app.get("/consultar_saidas", async (req, res) => {
  const resposta = await consultar_saida();

  res.json(resposta);
});

app.listen(3001, () => {
  const data = new Date();
  console.log("Servidor Iniciado" + data);
});
