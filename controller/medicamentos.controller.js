import express from "express";
import { MedicamentosModel } from '../model/medicamentos.model.js'

export const MedicamentosController = express.Router();

MedicamentosController.get("/", async (req, res) => {
  res.json(await MedicamentosModel.getAll());
});

MedicamentosController.get("/:id", async (req, res) => {
  res.json(await MedicamentosModel.getById(req.params.id));
});

MedicamentosController.post("/", async (req, res) => {
  res.json(await MedicamentosModel.create(req.body));
});

MedicamentosController.put("/:id", async (req, res) => {
  res.json(await MedicamentosModel.update(req.params.id, req.body));
});

MedicamentosController.delete("/:id", async (req, res) => {
  res.json(await MedicamentosModel.delete(req.params.id));
});
