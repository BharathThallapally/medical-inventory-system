const { getPool } = require("../config/db");

// ==========================================
// GET MEDICINE REMINDERS
// ==========================================

const getReminders = async (req, res) => {
  try {
    const pool = getPool();

    // Find medicines with low stock
    const [lowStockMedicines] = await pool.execute(`
      SELECT *
      FROM medicines
      WHERE quantity < 10
      ORDER BY quantity ASC
    `);

    // Find medicines expiring within the next 30 days
    const [expiringMedicines] = await pool.execute(`
      SELECT *
      FROM medicines
      WHERE expiry_date >= CURDATE()
        AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
      ORDER BY expiry_date ASC
    `);

    // Find already expired medicines
    const [expiredMedicines] = await pool.execute(`
      SELECT *
      FROM medicines
      WHERE expiry_date < CURDATE()
      ORDER BY expiry_date ASC
    `);

    // Convert database column names to API field names
    const formatMedicine = (medicine) => ({
      id: medicine.id,
      medicineName: medicine.medicine_name,
      manufacturer: medicine.manufacturer,
      batchNumber: medicine.batch_number,
      expiryDate: medicine.expiry_date,
      dosage: medicine.dosage,
      price: Number(medicine.price),
      quantity: medicine.quantity,
      category: medicine.category,
      createdAt: medicine.created_at,
      updatedAt: medicine.updated_at,
    });

    const lowStock = lowStockMedicines.map(formatMedicine);
    const expiringSoon = expiringMedicines.map(formatMedicine);
    const expired = expiredMedicines.map(formatMedicine);

    res.status(200).json({
      success: true,
      message: "Reminders fetched successfully",

      data: {
        lowStock,
        expiringSoon,
        expired,
      },

      summary: {
        lowStockCount: lowStock.length,
        expiringSoonCount: expiringSoon.length,
        expiredCount: expired.length,
      },
    });
  } catch (error) {
    console.error("Reminder Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reminders",
    });
  }
};

module.exports = {
  getReminders,
};