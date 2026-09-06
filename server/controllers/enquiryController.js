const Enquiry = require("../models/Enquiry");
const Service = require("../models/Service");

// ==========================================
// CREATE ENQUIRY
// ==========================================

const createEnquiry = async (req, res) => {
  try {
    const { serviceId, name, email, phone, message } = req.body;

    // Check required fields
    if (!serviceId || !name || !email || !message) {
      return res.status(400).json({
        message: "Service, name, email and message are required",
      });
    }

    // Find service
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Only approved services can receive enquiries
    if (service.status !== "approved") {
      return res.status(400).json({
        message: "Enquiries can only be sent to approved services",
      });
    }

    // Create enquiry
    const enquiry = await Enquiry.create({
      service: service._id,
      user: req.user.id,
      provider: service.provider,
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Enquiry sent successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Create enquiry error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET MY ENQUIRIES
// ==========================================

const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      user: req.user.id,
    })
      .populate("service", "title slug")
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get my enquiries error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// GET PROVIDER ENQUIRIES
// ==========================================

const getProviderEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      provider: req.user.id,
    })
      .populate("service", "title slug")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get provider enquiries error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// UPDATE ENQUIRY STATUS
// ==========================================

const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "contacted",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid enquiry status",
      });
    }

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    // Only the assigned provider can update the enquiry
    if (
      enquiry.provider.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You cannot update this enquiry.",
      });
    }

    enquiry.status = status;

    await enquiry.save();

    res.status(200).json({
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry status error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  createEnquiry,
  getMyEnquiries,
  getProviderEnquiries,
  updateEnquiryStatus,
};