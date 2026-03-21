import express from "express";
import { ClientesModel } from "../model/clientes.model.js";

export const ClientesController = express.Router();

ClientesController.get("/", async (req, res) => {
  res.json(await ClientesModel.getAll());
});

ClientesController.get("/:id", async (req, res) => {
  res.json(await ClientesModel.getById(req.params.id));
});

ClientesController.post("/", async (req, res) => {
  res.json(await ClientesModel.create(req.body));
});

ClientesController.put("/:id", async (req, res) => {
  res.json(await ClientesModel.update(req.params.id, req.body));
});

ClientesController.delete("/:id", async (req, res) => {
  res.json(await ClientesModel.delete(req.params.id));
});
