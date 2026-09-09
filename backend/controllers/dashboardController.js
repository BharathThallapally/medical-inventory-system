const { getPool } = require("../config/db");

// ==========================================
// GET DASHBOARD STATISTICS
// ==========================================

const getDashboardStats = async (req, res) => {
  try {
    const pool = getPool();

    // Get total number of medicines
    const [totalResult] = await pool.execute(`
      SELECT COUNT(*) AS totalMedicines
      FROM medicines
    `);

    // Get expired medicines
    const [expiredResult] = await pool.execute(`
      SELECT COUNT(*) AS expired
      FROM medicines
      WHERE expiry_date < CURDATE()
    `);

    // Get medicines expiring within the next 30 days
    const [nearExpiryResult] = await pool.execute(`
      SELECT COUNT(*) AS nearExpiry
      FROM medicines
      WHERE expiry_date >= CURDATE()
        AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `);

    // Get low-stock medicines
    const [lowStockResult] = await pool.execute(`
      SELECT COUNT(*) AS lowStock
      FROM medicines
      WHERE quantity <= 10
    `);

    res.status(200).json({
      success: true,
      data: {
        totalMedicines: Number(totalResult[0].totalMedicines),
        expired: Number(expiredResult[0].expired),
        nearExpiry: Number(nearExpiryResult[0].nearExpiry),
        lowStock: Number(lowStockResult[0].lowStock),
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};

module.exports = {
  getDashboardStats,
};