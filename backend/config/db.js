const mysql = require("mysql2/promise");

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 4000),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dateStrings: ["DATE"],
      ssl: {
        rejectUnauthorized: true
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the database connection
    const connection = await pool.getConnection();
    await connection.query("SELECT 1");
    connection.release();

    console.log("✅ MySQL/TiDB Connected Successfully");

    return pool;
  } catch (error) {
    console.error("❌ MySQL/TiDB Connection Failed");
    console.error(error.message);

    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database pool has not been initialized");
  }

  return pool;
};

module.exports = {
  connectDB,
  getPool
};