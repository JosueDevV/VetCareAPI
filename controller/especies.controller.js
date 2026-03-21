import express from "express";
import { EspeciesModel } from "../model/especies.model.js";

export const EspeciesController = express.Router();

EspeciesController.get("/", async (req, res) => {
  res.json(await EspeciesModel.getAll());
});

EspeciesController.get("/:id", async (req, res) => {
  res.json(await EspeciesModel.getById(req.params.id));
});

EspeciesController.post("/", async (req, res) => {
  res.json(await EspeciesModel.create(req.body));
});

EspeciesController.put("/:id", async (req, res) => {
  res.json(await EspeciesModel.update(req.params.id, req.body));
});

EspeciesController.delete("/:id", async (req, res) => {
  res.json(await EspeciesModel.delete(req.params.id));
});
