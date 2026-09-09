require("dotenv").config();

const mysql = require("mysql2/promise");

const initializeDatabase = async () => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 4000),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: true,
      },
    });

    console.log("✅ Connected to TiDB Cloud");

    // Create application database
    await connection.query(
      "CREATE DATABASE IF NOT EXISTS medical_inventory"
    );

    console.log("✅ Database 'medical_inventory' is ready");

    // Switch to application database
    await connection.query("USE medical_inventory");

    // Create medicines table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS medicines (
        id INT AUTO_INCREMENT PRIMARY KEY,
        medicine_name VARCHAR(150) NOT NULL,
        manufacturer VARCHAR(150) NOT NULL,
        batch_number VARCHAR(100) NOT NULL UNIQUE,
        expiry_date DATE NOT NULL,
        dosage VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ 'medicines' table is ready");

    // Indexes for dashboard and reminder queries
    await connection.query(`
      CREATE INDEX idx_medicines_expiry
      ON medicines (expiry_date)
    `).catch((error) => {
      if (error.code !== "ER_DUP_KEYNAME") {
        throw error;
      }
    });

    await connection.query(`
      CREATE INDEX idx_medicines_quantity
      ON medicines (quantity)
    `).catch((error) => {
      if (error.code !== "ER_DUP_KEYNAME") {
        throw error;
      }
    });

    await connection.query(`
      CREATE INDEX idx_medicines_category
      ON medicines (category)
    `).catch((error) => {
      if (error.code !== "ER_DUP_KEYNAME") {
        throw error;
      }
    });

    console.log("✅ Database indexes are ready");
    console.log("🎉 Database initialization completed successfully");
  } catch (error) {
    console.error("❌ Database initialization failed");
    console.error(error.message);

    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database connection closed");
    }
  }
};

initializeDatabase();