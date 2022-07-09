const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgresql://postgres:w5gP7CNmV4zW19D71qrn@containers-us-west-79.railway.app:7988/railway",
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  pool,
};
