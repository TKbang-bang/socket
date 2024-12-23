const session = require("express-session");
const MyStore = require("express-mysql-session")(session);

const options = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "soytk",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "global_chat",
};

const store = new MyStore(options);

module.exports = store;
