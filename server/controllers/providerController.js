const User = require("../models/User");
const Service = require("../models/Service");
// ==========================================
// GET PROVIDER PROFILE
// ==========================================

const getProviderProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id).select(
      "-password"
    );

    // Check if provider exists
    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    // Check provider role
    if (provider.role !== "provider" && provider.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Provider account required.",
      });
    }

    res.status(200).json({
      provider,
    });
  } catch (error) {
    console.error("Get provider profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// GET MY SERVICES
// ==========================================

const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({
      provider: req.user.id,
    })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get my services error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// UPDATE PROVIDER PROFILE
// ==========================================

const updateProviderProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    // Check if provider exists
    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    // Check provider role
    if (provider.role !== "provider" && provider.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Provider account required.",
      });
    }

    const { name, phone, avatar } = req.body;

    // Update only provided fields
    if (name !== undefined) provider.name = name;
    if (phone !== undefined) provider.phone = phone;
    if (avatar !== undefined) provider.avatar = avatar;

    await provider.save();

    res.status(200).json({
      message: "Provider profile updated successfully",
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        role: provider.role,
        avatar: provider.avatar,
      },
    });
  } catch (error) {
    console.error("Update provider profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET PROVIDER DASHBOARD
// ==========================================

const getProviderDashboard = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id).select("-password");

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    const services = await Service.find({
      provider: req.user.id,
    });

    const totalServices = services.length;

    const approvedServices = services.filter(
      (service) => service.status === "approved"
    ).length;

    const pendingServices = services.filter(
      (service) => service.status === "pending"
    ).length;

    const rejectedServices = services.filter(
      (service) => service.status === "rejected"
    ).length;

    res.status(200).json({
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        role: provider.role,
        avatar: provider.avatar,
      },
      statistics: {
        totalServices,
        approvedServices,
        pendingServices,
        rejectedServices,
      },
    });
  } catch (error) {
    console.error("Get provider dashboard error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getProviderProfile,
  getMyServices,
  updateProviderProfile,
  getProviderDashboard,
};