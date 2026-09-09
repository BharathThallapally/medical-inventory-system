const express = require("express");

const {
  addMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

const router = express.Router();

// Create medicine
router.post("/", addMedicine);

// Get all medicines
router.get("/", getAllMedicines);

// Get one medicine
router.get("/:id", getMedicineById);

// Update medicine
router.put("/:id", updateMedicine);

// Delete medicine
router.delete("/:id", deleteMedicine);

module.exports = router;