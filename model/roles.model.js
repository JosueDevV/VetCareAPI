import { db } from "./db.js";

export const RolesModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM roles");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM roles WHERE id=?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name } = data;
    const [result] = await db.query(
      "INSERT INTO roles (name) VALUES (?)",
      [name]
    );
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name } = data;
    await db.query(
      "UPDATE roles SET name=? WHERE id=?",
      [name, id]
    );
    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM roles WHERE id=?", [id]);
    return { message: "Role deleted" };
  }
};
