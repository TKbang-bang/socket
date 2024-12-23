const mysql = require("mysql2/promise");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "soytk",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "global_chat",
});

module.exports = db;
