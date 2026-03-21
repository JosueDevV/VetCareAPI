import { db } from "./db.js";

export const MascotasModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM pets");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM pets WHERE id=?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name, breed, age, client_id, species_id } = data;

    const [result] = await db.query(
      `INSERT INTO pets (name, breed, age, client_id, species_id)
       VALUES (?, ?, ?, ?, ?)`,
      [name, breed, age, client_id, species_id]
    );

    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name, breed, age, client_id, species_id } = data;

    await db.query(
      `UPDATE pets SET name=?, breed=?, age=?, client_id=?, species_id=? WHERE id=?`,
      [name, breed, age, client_id, species_id, id]
    );

    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM pets WHERE id=?", [id]);
    return { message: "Mascota eliminada" };
  }
};
