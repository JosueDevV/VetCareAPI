import { db } from "./db.js";

export const MedicamentosModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM medications");

    return rows.map(m => ({
      id: m.id,
      nombre: m.name,
      descripcion: m.description,
      precio: m.price,
      efectos: m.side_effects,
      expiracion: m.expiration_date
    }));
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM medications WHERE id=?", [id]);
    const m = rows[0];

    return {
      id: m.id,
      nombre: m.name,
      descripcion: m.description,
      precio: m.price,
      efectos: m.side_effects,
      expiracion: m.expiration_date
    };
  },

  async create(data) {
    const {
      nombre,
      descripcion,
      precio,
      efectos,
      expiracion
    } = data;

    const [result] = await db.query(
      `INSERT INTO medications (name, description, price, side_effects, expiration_date)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, efectos, expiracion]
    );

    return {
      id: result.insertId,
      nombre,
      descripcion,
      precio,
      efectos,
      expiracion
    };
  },

  async update(id, data) {
    const {
      nombre,
      descripcion,
      precio,
      efectos,
      expiracion
    } = data;

    await db.query(
      `UPDATE medications
       SET name=?, description=?, price=?, side_effects=?, expiration_date=?
       WHERE id=?`,
      [nombre, descripcion, precio, efectos, expiracion, id]
    );

    return {
      id,
      nombre,
      descripcion,
      precio,
      efectos,
      expiracion
    };
  },

  async delete(id) {
    await db.query("DELETE FROM medications WHERE id=?", [id]);
    return { message: "Medicamento eliminado" };
  }
};
