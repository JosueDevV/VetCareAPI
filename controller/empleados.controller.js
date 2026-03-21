import express from "express";
import { EmpleadosModel } from "../model/empleados.model.js";

export const EmpleadosController = express.Router();

EmpleadosController.get("/", async (req, res) => {
  res.json(await EmpleadosModel.getAll());
});

EmpleadosController.get("/:id", async (req, res) => {
  res.json(await EmpleadosModel.getById(req.params.id));
});

EmpleadosController.post("/", async (req, res) => {
  res.json(await EmpleadosModel.create(req.body));
});

EmpleadosController.put("/:id", async (req, res) => {
  res.json(await EmpleadosModel.update(req.params.id, req.body));
});

EmpleadosController.delete("/:id", async (req, res) => {
  res.json(await EmpleadosModel.delete(req.params.id));
});
