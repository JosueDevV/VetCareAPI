import express from "express";
import { RolesModel } from "../model/roles.model.js";

export const RolesController = express.Router();

RolesController.get("/", async (req, res) => {
  res.json(await RolesModel.getAll());
});

RolesController.get("/:id", async (req, res) => {
  res.json(await RolesModel.getById(req.params.id));
});

RolesController.post("/", async (req, res) => {
  res.json(await RolesModel.create(req.body));
});

RolesController.put("/:id", async (req, res) => {
  res.json(await RolesModel.update(req.params.id, req.body));
});

RolesController.delete("/:id", async (req, res) => {
  res.json(await RolesModel.delete(req.params.id));
});
