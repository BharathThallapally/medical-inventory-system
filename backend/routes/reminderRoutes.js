const express = require("express");

const router = express.Router();

const {
  getReminders,
} = require("../controllers/reminderController");

// GET /api/reminders
router.get("/", getReminders);

module.exports = router;