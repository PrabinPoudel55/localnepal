const express = require("express");

const {
  createEnquiry,
  getMyEnquiries,
  getProviderEnquiries,
  updateEnquiryStatus,
} = require("../controllers/enquiryController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

// Create enquiry
router.post("/", protect, createEnquiry);
// Get my enquiries
router.get("/my", protect, getMyEnquiries);
// Get enquiries received by provider
router.get(
  "/provider",
  protect,
  authorize("provider", "admin"),
  getProviderEnquiries
);
// Update enquiry status
router.put(
  "/:id/status",
  protect,
  authorize("provider", "admin"),
  updateEnquiryStatus
);
module.exports = router;