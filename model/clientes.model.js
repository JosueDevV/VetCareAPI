import { db } from "./db.js";

export const ClientesModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM clients");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM clients WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name, phone, email } = data;
    const [result] = await db.query(
      "INSERT INTO clients (name, phone, email) VALUES (?, ?, ?)",
      [name, phone, email]
    );
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name, phone, email } = data;
    await db.query(
      "UPDATE clients SET name = ?, phone = ?, email = ? WHERE id = ?",
      [name, phone, email, id]
    );
    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM clients WHERE id = ?", [id]);
    return { message: "Cliente eliminado" };
  }
};
