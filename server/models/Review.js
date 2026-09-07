const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user can review a service only once
reviewSchema.index(
  { service: 1, user: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);