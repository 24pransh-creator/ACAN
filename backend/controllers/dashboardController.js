const User = require("../models/User");

// ================= DASHBOARD =================

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDrivers = await User.countDocuments({
      role: "train_driver",
    });

    const totalRailway = await User.countDocuments({
      role: "railway",
    });

    const totalForest = await User.countDocuments({
      role: "forest",
    });

    const totalViewers = await User.countDocuments({
      role: "viewer",
    });

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalDrivers,
        totalRailway,
        totalForest,
        totalViewers,
        totalTrains: 0,
        totalCameras: 2,
        totalAlerts: 2,
        aiStatus: "Online",
        systemHealth: "Excellent",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CAMERA =================

const getCamera = async (req, res) => {
  res.json({
    success: true,
    cameras: [
      {
        id: 1,
        name: "Camera 01",
        location: "Junagadh Track",
        status: "Online",
      },
      {
        id: 2,
        name: "Camera 02",
        location: "Gir Forest",
        status: "Online",
      },
    ],
  });
};

// ================= ALERTS =================

const getAlerts = async (req, res) => {
  res.json({
    success: true,
    alerts: [
      {
        id: 1,
        animal: "Lion",
        location: "KM 82",
        time: "10:30 AM",
      },
      {
        id: 2,
        animal: "Leopard",
        location: "KM 91",
        time: "11:15 AM",
      },
    ],
  });
};

// ================= TRAINS =================

const getTrains = async (req, res) => {
  res.json({
    success: true,
    trains: [
      {
        trainNumber: "962011",
        status: "Running",
        zone: "Junagadh",
      },
    ],
  });
};

// ================= ANIMALS =================

const getAnimals = async (req, res) => {
  res.json({
    success: true,
    animals: [
      {
        name: "Lion",
        confidence: "98%",
      },
      {
        name: "Leopard",
        confidence: "95%",
      },
    ],
  });
};

// ================= REPORTS =================

const getReports = async (req, res) => {
  res.json({
    success: true,
    reports: [
      {
        id: 1,
        title: "Today's Detection Report",
      },
    ],
  });
};

module.exports = {
  getDashboard,
  getCamera,
  getAlerts,
  getTrains,
  getAnimals,
  getReports,
};