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
    "postgres://vhohafagcjkcyh:b53386fbfbacdcdf9466eacee8a5f987b0ef795f6efc37053e31ce3183d1b404@ec2-3-217-113-25.compute-1.amazonaws.com:5432/d90nnd36aksmpm",
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  pool,
};
