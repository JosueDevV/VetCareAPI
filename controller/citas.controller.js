import express from "express";
import { CitasModel } from "../model/citas.model.js";

export const CitasController = express.Router();

CitasController.get("/", async (req, res) => {
  try {
    const rows = await CitasModel.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas", sqlError: error.message });
  }
});

CitasController.post("/", async (req, res) => {
  try {
    const { client_id, pet_id, service_id, employee_id, date, time, motivo, notes } = req.body;

    if (!client_id || !pet_id || !service_id || !employee_id || !date || !time) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nueva = await CitasModel.create({
      client_id,
      pet_id,
      service_id,
      employee_id,
      date,
      time,
      motivo: motivo || "Consulta",
      notes: notes || ""
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita", sqlError: error.message });
  }
});

CitasController.put("/:id/alta", async (req, res) => {
  try {
    const result = await CitasModel.darDeAlta(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }
    res.json({ message: "Alta procesada" });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar alta", sqlError: error.message });
  }
});

CitasController.delete("/:id", async (req, res) => {
  try {
    const result = await CitasModel.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar", sqlError: error.message });
  }
});
