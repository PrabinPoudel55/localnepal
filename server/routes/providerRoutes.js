const express = require("express");

const {
  getProviderProfile,
  getMyServices,
  updateProviderProfile,
  getProviderDashboard,

} = require("../controllers/providerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Get provider profile
router.get(
  "/profile",
  protect,
  authorize("provider", "admin"),
  getProviderProfile
);
// Get my services
router.get(
  "/services",
  protect,
  authorize("provider", "admin"),
  getMyServices
);
// Update provider profile
router.put(
  "/profile",
  protect,
  authorize("provider", "admin"),
  updateProviderProfile
);
// Get provider dashboard
router.get(
  "/dashboard",
  protect,
  authorize("provider", "admin"),
  getProviderDashboard
);

module.exports = router;