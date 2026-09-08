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
// ==========================================
// UPDATE CATEGORY - ADMIN
// ==========================================

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name, slug, description, icon, image, isActive } = req.body;

    if (name !== undefined) category.name = name;
    if (slug !== undefined) category.slug = slug;
    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// DELETE CATEGORY - ADMIN
// ==========================================

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};