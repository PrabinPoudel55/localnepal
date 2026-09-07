const Review = require("../models/Review");
const Service = require("../models/Service");

// ==========================================
// CREATE REVIEW
// ==========================================

const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    // Check required fields
    if (!serviceId || rating === undefined || !comment) {
      return res.status(400).json({
        message: "Service, rating and comment are required",
      });
    }

    // Validate rating
    const numericRating = Number(rating);

if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
  return res.status(400).json({
    message: "Rating must be a number between 1 and 5",
  });
}

    // Find service
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Only approved services can be reviewed
    if (service.status !== "approved") {
      return res.status(400).json({
        message: "Only approved services can be reviewed",
      });
    }

    // Check for existing review
    const existingReview = await Review.findOne({
      service: serviceId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this service",
      });
    }

    // Create review
    const review = await Review.create({
      service: serviceId,
      user: req.user.id,
      rating: numericRating,
      comment,
    });
    // Calculate updated service rating
const reviews = await Review.find({
  service: serviceId,
});

const totalRating = reviews.reduce(
  (sum, review) => sum + review.rating,
  0
);

const averageRating = totalRating / reviews.length;

service.rating = Number(averageRating.toFixed(1));
service.reviewsCount = reviews.length;

await service.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// GET SERVICE REVIEWS
// ==========================================

const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      service: req.params.serviceId,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get service reviews error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createReview,
  getServiceReviews,
};