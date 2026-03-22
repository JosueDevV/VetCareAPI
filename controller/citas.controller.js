import express from "express";
import { CitasModel } from "../model/citas.model.js";

export const CitasController = express.Router();

CitasController.get("/", async (req, res) => {
  try {
    const rows = await CitasModel.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas" });
  }
});

CitasController.post("/", async (req, res) => {
  try {
    const nueva = await CitasModel.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita", detail: error.message });
  }
});

CitasController.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await CitasModel.update(id, req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cita", detail: error.message });
  }
});

CitasController.delete("/:id", async (req, res) => {
  try {
    await CitasModel.delete(req.params.id);
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});
