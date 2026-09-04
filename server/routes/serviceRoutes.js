const express = require("express");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all approved services
router.get("/", getServices);

// Get single approved service
router.get("/:id", getServiceById);

// Create a new service
router.post(
  "/",
  protect,
  authorize("provider", "admin"),
  createService
);
// Update service
router.put(
  "/:id",
  protect,
  authorize("provider", "admin"),
  updateService
);
// Delete service
router.delete(
  "/:id",
  protect,
  authorize("provider", "admin"),
  deleteService
);

module.exports = router;