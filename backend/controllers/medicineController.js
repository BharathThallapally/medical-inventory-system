const { getPool } = require("../config/db");

// ==========================================
// VALIDATION HELPER
// ==========================================

const validateMedicine = (data) => {
  const requiredFields = [
    "medicineName",
    "manufacturer",
    "batchNumber",
    "expiryDate",
    "dosage",
    "price",
    "quantity",
    "category",
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      data[field] === undefined ||
      data[field] === null ||
      data[field] === ""
  );

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }

  if (Number(data.price) < 0) {
    return "Price cannot be negative.";
  }

  if (!Number.isInteger(Number(data.quantity)) || Number(data.quantity) < 0) {
    return "Quantity must be a non-negative integer.";
  }

  return null;
};

// ==========================================
// FORMAT MEDICINE
// ==========================================

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

// ==========================================
// ADD MEDICINE
// ==========================================

const addMedicine = async (req, res) => {
  try {
    const validationError = validateMedicine(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const {
      medicineName,
      manufacturer,
      batchNumber,
      expiryDate,
      dosage,
      price,
      quantity,
      category,
    } = req.body;

    const pool = getPool();

    const [result] = await pool.execute(
      `
      INSERT INTO medicines
      (
        medicine_name,
        manufacturer,
        batch_number,
        expiry_date,
        dosage,
        price,
        quantity,
        category
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        medicineName.trim(),
        manufacturer.trim(),
        batchNumber.trim(),
        expiryDate,
        dosage.trim(),
        Number(price),
        Number(quantity),
        category.trim(),
      ]
    );

    const [rows] = await pool.execute(
      "SELECT * FROM medicines WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: formatMedicine(rows[0]),
    });
  } catch (error) {
    console.error("Add Medicine Error:", error);

    // Duplicate batch number
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Batch number already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add medicine.",
    });
  }
};

// ==========================================
// GET ALL MEDICINES
// ==========================================

const getAllMedicines = async (req, res) => {
  try {
    const pool = getPool();

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM medicines
      ORDER BY created_at DESC
      `
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows.map(formatMedicine),
    });
  } catch (error) {
    console.error("Get Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines.",
    });
  }
};

// ==========================================
// GET MEDICINE BY ID
// ==========================================

const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine ID.",
      });
    }

    const pool = getPool();

    const [rows] = await pool.execute(
      "SELECT * FROM medicines WHERE id = ?",
      [Number(id)]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: formatMedicine(rows[0]),
    });
  } catch (error) {
    console.error("Get Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine.",
    });
  }
};

// ==========================================
// UPDATE MEDICINE
// ==========================================

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine ID.",
      });
    }

    const validationError = validateMedicine(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const {
      medicineName,
      manufacturer,
      batchNumber,
      expiryDate,
      dosage,
      price,
      quantity,
      category,
    } = req.body;

    const pool = getPool();

    const [result] = await pool.execute(
      `
      UPDATE medicines
      SET
        medicine_name = ?,
        manufacturer = ?,
        batch_number = ?,
        expiry_date = ?,
        dosage = ?,
        price = ?,
        quantity = ?,
        category = ?
      WHERE id = ?
      `,
      [
        medicineName.trim(),
        manufacturer.trim(),
        batchNumber.trim(),
        expiryDate,
        dosage.trim(),
        Number(price),
        Number(quantity),
        category.trim(),
        Number(id),
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM medicines WHERE id = ?",
      [Number(id)]
    );

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: formatMedicine(rows[0]),
    });
  } catch (error) {
    console.error("Update Medicine Error:", error);

    // Duplicate batch number
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Batch number already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update medicine.",
    });
  }
};

// ==========================================
// DELETE MEDICINE
// ==========================================

const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine ID.",
      });
    }

    const pool = getPool();

    const [rows] = await pool.execute(
      "SELECT * FROM medicines WHERE id = ?",
      [Number(id)]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    await pool.execute(
      "DELETE FROM medicines WHERE id = ?",
      [Number(id)]
    );

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: formatMedicine(rows[0]),
    });
  } catch (error) {
    console.error("Delete Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete medicine.",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  addMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};