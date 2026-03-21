import express from "express"
import { MascotasModel } from "../model/mascotas.model.js";

export const MascotasController = express.Router();

MascotasController.get("/", async (req, res) => {
  res.json(await MascotasModel.getAll());
});

MascotasController.get("/:id", async (req, res) => {
  res.json(await MascotasModel.getById(req.params.id));
});

MascotasController.post("/", async (req, res) => {
  res.json(await MascotasModel.create(req.body));
});

MascotasController.put("/:id", async (req, res) => {
  const { id } = req.params
  console.log("ID Recibido: ", id)
  res.json(await MascotasModel.update(id, req.body));
});

MascotasController.delete("/:id", async (req, res) => {
  res.json(await MascotasModel.delete(req.params.id));
});

MascotasController.patch("/:id", async (req, res) => {
  const { id } = req.params
  res.json(await MascotasModel.updatePartial(id, req.body))
})
