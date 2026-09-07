const express = require("express");

const {
  createReview,
  getServiceReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create review
router.post("/", protect, createReview);

// Get reviews for a service
router.get("/service/:serviceId", getServiceReviews);

module.exports = router;