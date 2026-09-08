const express = require("express");

const {
  getAllUsers,
  updateUserStatus,
  getUserById,
} = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin - get all users
router.get("/users", protect, adminOnly, getAllUsers);
// Admin - get single user
router.get("/users/:id", protect, adminOnly, getUserById);
// Admin - activate/deactivate user
router.put("/users/:id/status", protect, adminOnly, updateUserStatus);


module.exports = router;