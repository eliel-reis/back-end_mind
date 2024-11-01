import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "88797351_zZ",
  database: "estoque",
});

export default pool;
