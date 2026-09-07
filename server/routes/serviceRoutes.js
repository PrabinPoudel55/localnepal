const express = require("express");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getAllServicesAdmin,
  updateServiceStatus,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all approved services
router.get("/", getServices);

// Admin - get all services
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllServicesAdmin
);

// Admin - approve or reject service
router.put(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateServiceStatus
);
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