const { Pool } = require("pg");
// db: killpxry_dapp
// host: premium104.web-hosting.com/
// user: dapp_user
// pw: 4bw!+#1vDQ+I
const pool = new Pool({
  // host: "localhost",
  // user: "postgres",
  // password: "123",
  // database: "dapp-db",
  // port: "5432",
  connectionString:
    "postgresql://postgres:cIO3xuRsA7DF1oy56l4I@containers-us-west-75.railway.app:5471/railway",
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  pool,
};
