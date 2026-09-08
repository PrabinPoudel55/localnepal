const User = require("../models/User");

// ==========================================
// GET ALL USERS - ADMIN
// ==========================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// ACTIVATE / DEACTIVATE USER - ADMIN
// ==========================================

const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    // Validate isActive
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be true or false",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent admin from deactivating their own account
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot change your own account status",
      });
    }

    user.isActive = isActive;

    await user.save();

    res.status(200).json({
      message: isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Update user status error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// GET SINGLE USER - ADMIN
// ==========================================

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get user by ID error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  getUserById,
};