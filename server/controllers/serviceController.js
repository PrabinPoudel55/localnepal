const Service = require("../models/Service");
const Category = require("../models/Category");

// ==========================================
// CREATE SERVICE
// ==========================================

const createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      phone,
      email,
      location,
      images,
      price,
      services,
      openingHours,
    } = req.body;

    // Check required fields
    if (!title || !slug || !description || !category) {
      return res.status(400).json({
        message: "Title, slug, description and category are required",
      });
    }

    // Check if category exists
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Check if slug already exists
    const existingService = await Service.findOne({ slug });

    if (existingService) {
      return res.status(400).json({
        message: "Service with this slug already exists",
      });
    }

    // Create service
    const service = await Service.create({
      title,
      slug,
      description,
      category,
      provider: req.user.id,
      phone,
      email,
      location,
      images,
      price,
      services,
      openingHours,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET APPROVED SERVICES
// ==========================================

const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: "approved",
    })
      .populate("category", "name slug")
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET SINGLE SERVICE
// ==========================================

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      status: "approved",
    })
      .populate("category", "name slug")
      .populate("provider", "name email phone");

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      service,
    });
  } catch (error) {
    console.error("Get service error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
};