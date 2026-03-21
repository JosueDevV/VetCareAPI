import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "caboose.proxy.rlwy.net",
  user: "root",
  password: "TBjjjkVUhzfWoAsCRcdkwcKJXrmFffuk",
  database: "VC", port: 44205,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});
