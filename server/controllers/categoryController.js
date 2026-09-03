const Category = require("../models/Category");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, slug, description, icon, image } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required",
      });
    }

    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      icon,
      image,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all active categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      isActive: true,
    }).sort({ name: 1 });

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
};