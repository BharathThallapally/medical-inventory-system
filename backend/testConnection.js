require("dotenv").config();

const { connectDB, getPool } = require("./config/db");

const testConnection = async () => {
  try {
    await connectDB();

    const pool = getPool();

    const [rows] = await pool.execute(
      "SELECT 1 AS connection_test"
    );

    console.log("✅ Database test successful");
    console.log(rows);

    await pool.end();

    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Database test failed");
    console.error(error.message);

    process.exit(1);
  }
};

testConnection();