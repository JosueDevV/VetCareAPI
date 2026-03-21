import express from "express";
import { AuthModel } from "../model/auth.model.js";

export const AuthController = express.Router();

AuthController.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await AuthModel.login(username, password);

  if (!user) {
    return res.status(401).json({ detail: "Credenciales incorrectas" });
  }

  res.json({
    token: "fake-token-demo", 
    message: "Inicio de sesión exitoso",
    user
  });
});
