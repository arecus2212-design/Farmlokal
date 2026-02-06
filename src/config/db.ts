import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yash@123",
  database: "test",
  connectionLimit: 20,
});
