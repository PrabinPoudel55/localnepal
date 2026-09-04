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

// ==========================================
// UPDATE SERVICE
// ==========================================

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // Check if service exists
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Provider can only update their own service
    if (
      req.user.role !== "admin" &&
      service.provider.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update your own service",
      });
    }

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

    // Update fields only if they are provided
    if (title !== undefined) service.title = title;
    if (slug !== undefined) service.slug = slug;
    if (description !== undefined) service.description = description;
    if (category !== undefined) service.category = category;
    if (phone !== undefined) service.phone = phone;
    if (email !== undefined) service.email = email;
    if (location !== undefined) service.location = location;
    if (images !== undefined) service.images = images;
    if (price !== undefined) service.price = price;
    if (services !== undefined) service.services = services;
    if (openingHours !== undefined) service.openingHours = openingHours;

    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// DELETE SERVICE
// ==========================================

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // Check if service exists
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Provider can only delete their own service
    if (
      req.user.role !== "admin" &&
      service.provider.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only delete your own service",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};