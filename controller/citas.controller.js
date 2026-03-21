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
    const { client_id, pet_id, service_id, employee_id, date, time, motivo, notes } = req.body;

    if (!client_id || !pet_id || !service_id || !employee_id || !date || !time) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    const datosFinales = {
      ...req.body,
      motivo: motivo || "Sin motivo especificado"
    };

    const nueva = await CitasModel.create(datosFinales);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita" });
  }
});

CitasController.put("/:id", async (req, res) => {
  try {
    const { motivo } = req.body;
    if (!motivo || motivo.trim() === "") {
      return res.status(400).json({ error: "Motivo obligatorio" });
    }

    const actualizada = await CitasModel.update(req.params.id, req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
});

CitasController.put("/:id/alta", async (req, res) => {
  try {
    const result = await CitasModel.darDeAlta(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }
    res.json({ message: "Alta actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el alta" });
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
    res.status(500).json({ error: "Error al eliminar la cita" });
  }
});
