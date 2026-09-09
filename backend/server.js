const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, getPool } = require("./config/db");

const medicineRoutes = require("./routes/medicineRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

const app = express();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Medical Inventory Backend is Running 🚀"
  });
});

// Health Check
app.get("/health", async (req, res) => {
  try {
    const pool = getPool();

    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      server: "running",
      database: "connected"
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      server: "running",
      database: "disconnected"
    });
  }
});

// API Routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reminders", reminderRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed.");
    console.error(error.message);
    console.error("⚠️ Server will not start until the database is available.");

    process.exit(1);
  }
};

startServer();