import { db } from "./db.js";

export const CitasModel = {
  async getAll() {
    const [rows] = await db.query(`
      SELECT c.*,
             cl.name AS client_name,
             p.name AS pet_name,
             e.name AS employee_name,
             s.name AS service_name
      FROM citas c
      LEFT JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN pets p ON c.pet_id = p.id
      LEFT JOIN employees e ON c.employee_id = e.id
      LEFT JOIN services s ON c.service_id = s.id
      ORDER BY c.date DESC, c.time DESC
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      `SELECT c.*,
              cl.name AS client_name,
              p.name AS pet_name,
              e.name AS employee_name,
              s.name AS service_name
       FROM citas c
       LEFT JOIN clients cl ON c.client_id = cl.id
       LEFT JOIN pets p ON c.pet_id = p.id
       LEFT JOIN employees e ON c.employee_id = e.id
       LEFT JOIN services s ON c.service_id = s.id
       WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { client_id, pet_id, service_id, employee_id, date, time, notes, motivo } = data;

    const [result] = await db.query(
      `INSERT INTO citas
       (client_id, pet_id, service_id, employee_id, date, time, notes, motivo, alta)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [client_id, pet_id, service_id, employee_id, date, time, notes || null, motivo]
    );

    return { id: result.insertId, ...data, alta: 0 };
  },

  async update(id, data) {
    const { client_id, pet_id, service_id, employee_id, date, time, notes, motivo } = data;

    const [result] = await db.query(
      `UPDATE citas
       SET client_id=?, pet_id=?, service_id=?, employee_id=?, 
           date=?, time=?, notes=?, motivo=?
       WHERE id=?`,
      [client_id, pet_id, service_id, employee_id, date, time, notes || null, motivo, id]
    );

    return { id, ...data, affectedRows: result.affectedRows };
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM citas WHERE id=?", [id]);
    return result;
  },

  async darDeAlta(id) {
    const [result] = await db.query(
      "UPDATE citas SET alta = 1 WHERE id = ?",
      [id]
    );
    return result;
  }
};
