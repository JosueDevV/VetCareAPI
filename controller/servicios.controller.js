import express from "express";
import { ServiciosModel } from "../model/servicios.model.js";

export const ServiciosController = express.Router();

ServiciosController.get("/", async (req, res) => {
  res.json(await ServiciosModel.getAll());
});

ServiciosController.get("/:id", async (req, res) => {
  res.json(await ServiciosModel.getById(req.params.id));
});

ServiciosController.post("/", async (req, res) => {
  res.json(await ServiciosModel.create(req.body));
});

ServiciosController.put("/:id", async (req, res) => {
  res.json(await ServiciosModel.update(req.params.id, req.body));
});

ServiciosController.delete("/:id", async (req, res) => {
  res.json(await ServiciosModel.delete(req.params.id));
});
