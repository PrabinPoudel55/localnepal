const express = require("express");

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Create category
router.post("/", protect, createCategory);

module.exports = router;