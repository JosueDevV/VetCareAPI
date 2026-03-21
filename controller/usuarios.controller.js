import express from "express";
import { UsuariosModel } from "../model/usuarios.model.js";

export const UsuariosController = express.Router();

UsuariosController.get("/", async (req, res) => {
  res.json(await UsuariosModel.getAll());
});

UsuariosController.get("/:id", async (req, res) => {
  res.json(await UsuariosModel.getById(req.params.id));
});

UsuariosController.post("/", async (req, res) => {
  res.json(await UsuariosModel.create(req.body));
});

UsuariosController.put("/:id", async (req, res) => {
  res.json(await UsuariosModel.update(req.params.id, req.body));
});

UsuariosController.delete("/:id", async (req, res) => {
  res.json(await UsuariosModel.delete(req.params.id));
});
