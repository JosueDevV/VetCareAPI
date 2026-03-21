import { db } from "./db.js";

export const UsuariosModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
    return rows[0];
  },

  async create(data) {
    const { username, password, role_id } = data;

    const [result] = await db.query(
      `INSERT INTO users (username, password, role_id)
       VALUES (?, ?, ?)`,
      [username, password, role_id]
    );

    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { username, password, role_id } = data;

    await db.query(
      `UPDATE users SET username=?, password=?, role_id=? WHERE id=?`,
      [username, password, role_id, id]
    );

    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM users WHERE id=?", [id]);
    return { message: "Usuario eliminado" };
  }
};
