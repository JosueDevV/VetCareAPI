import { db } from "./db.js";

export const AuthModel = {
  async login(username, password) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password]
    );

    if (rows.length === 0) return null;

    return rows[0];
  },
};
