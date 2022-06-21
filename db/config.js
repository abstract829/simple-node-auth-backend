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
    "postgresql://postgres:Aj231Td30y5tQQhnI1wq@containers-us-west-61.railway.app:6631/railway",
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  pool,
};
