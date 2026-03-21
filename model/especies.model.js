import { db } from "./db.js";

export const EspeciesModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM species");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM species WHERE id=?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name } = data;
    const [result] = await db.query(
      "INSERT INTO species (name) VALUES (?)",
      [name]
    );
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name } = data;
    await db.query(
      "UPDATE species SET name=? WHERE id=?",
      [name, id]
    );
    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM species WHERE id=?", [id]);
    return { message: "Species deleted" };
  }
};
