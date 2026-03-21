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
    const { client_id, pet_id, service_id, employee_id, date, time, notes } = data;

    const [result] = await db.query(
      `INSERT INTO citas 
       (client_id, pet_id, service_id, employee_id, date, time, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [client_id, pet_id, service_id, employee_id, date, time, notes]
    );

    const newId = result.insertId;

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
      WHERE c.id = ?
    `, [newId]);

    return rows[0];
  },

  async delete(id) {
    return await db.query("DELETE FROM citas WHERE id = ?", [id]);
  }
};
