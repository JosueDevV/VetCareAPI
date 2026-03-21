import express from "express";
import { CitasModel } from "../model/citas.model.js";

export const CitasController = express.Router();

CitasController.get("/", async (req, res) => {
  res.json(await CitasModel.getAll());
});

CitasController.get("/:id", async (req, res) => {
  res.json(await CitasModel.getById(req.params.id));
});

CitasController.post("/", async (req, res) => {
  const { client_id, pet_id, service_id, employee_id, date, time, notes, motivo } = req.body;

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
    notes,
    motivo
  });

  res.json(nueva);
});

CitasController.put("/:id", async (req, res) => {
  if (!req.body.motivo || req.body.motivo.trim() === "") {
    return res.status(400).json({ error: "Motivo obligatorio" });
  }

  const actualizada = await CitasModel.update(req.params.id, req.body);
  res.json(actualizada);
});

CitasController.put("/:id/alta", async (req, res) => {
  const result = await CitasModel.darDeAlta(req.params.id);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Cita no encontrada" });
  }

  res.json({ message: "Alta actualizada" });
});

CitasController.delete("/:id", async (req, res) => {
  await CitasModel.delete(req.params.id);
  res.json({ message: "Cita eliminada" });
});
