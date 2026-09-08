const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Create category
router.post("/", protect, adminOnly, createCategory);
// Admin - update category
router.put("/:id", protect, adminOnly, updateCategory);

// Admin - delete category
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;