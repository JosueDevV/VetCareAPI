import { db } from "./db.js";

export const ServiciosModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM services ORDER BY id DESC");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM services WHERE id=?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name, description, price } = data;

    const [result] = await db.query(
      `INSERT INTO services (name, description, price)
       VALUES (?, ?, ?)`,
      [name, description, price]
    );

    return {
      id: result.insertId,
      name,
      description,
      price
    };
  },

  async update(id, data) {
    const { name, description, price } = data;

    await db.query(
      `UPDATE services SET name=?, description=?, price=? WHERE id=?`,
      [name, description, price, id]
    );

    return {
      id,
      name,
      description,
      price
    };
  },

  async delete(id) {
    await db.query("DELETE FROM services WHERE id=?", [id]);
    return { message: "Servicio eliminado" };
  }
};
