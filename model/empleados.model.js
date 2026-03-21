import { db } from "./db.js";

export const EmpleadosModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM employees");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name, last_name, middle_name, phone, email, role_id, salary } = data;

    const [result] = await db.query(
      `INSERT INTO employees (name, last_name, middle_name, phone, email, role_id, salary)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, last_name, middle_name, phone, email, role_id, salary]
    );

    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name, last_name, middle_name, phone, email, role_id, salary } = data;

    await db.query(
      `UPDATE employees SET name=?, last_name=?, middle_name=?, phone=?, email=?, role_id=?, salary=?
       WHERE id=?`,
      [name, last_name, middle_name, phone, email, role_id, salary, id]
    );

    return { id, ...data };
  },

  async delete(id) {
    await db.query("DELETE FROM employees WHERE id=?", [id]);
    return { message: "Empleado eliminado" };
  }
};
