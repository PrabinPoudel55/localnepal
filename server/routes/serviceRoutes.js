const express = require("express");

const {
  createService,
  getServices,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all approved services
router.get("/", getServices);

// Create a new service
router.post(
  "/",
  protect,
  authorize("provider", "admin"),
  createService
);

module.exports = router;