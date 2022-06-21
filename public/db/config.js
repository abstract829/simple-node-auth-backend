const { Pool } = require("pg");

const pool = new Pool({
  // host: "localhost",
  // user: "postgres",
  // password: "123",
  // database: "dapp-db",
  // port: "5432",
  connectionString:
    "postgresql://postgres:cIO3xuRsA7DF1oy56l4I@containers-us-west-75.railway.app:5471/railway",
});

module.exports = {
  pool,
};
