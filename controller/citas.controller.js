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

CitasController.get("/:id", async (req, res) => {
  try {
    const row = await CitasModel.getById(req.params.id);
    if (!row) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cita" });
  }
});

CitasController.post("/", async (req, res) => {
  try {
    const { client_id, pet_id, service_id, employee_id, date, time, notes } = req.body;

    if (!client_id || !pet_id || !service_id || !employee_id || !date || !time) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    const nueva = await CitasModel.create({
      client_id,
      pet_id,
      service_id,
      employee_id,
      date,
      time,
      notes: notes || ""
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita", detail: error.message });
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
