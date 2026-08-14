const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getCamera,
  getAlerts,
  getTrains,
  getAnimals,
  getReports,
} = require("../controllers/dashboardController");

// Dashboard
router.get("/", getDashboard);

// Live Camera
router.get("/camera", getCamera);

// Live Alerts
router.get("/alerts", getAlerts);

// Train Management
router.get("/trains", getTrains);

// Animal Detection
router.get("/animals", getAnimals);

// Reports
router.get("/reports", getReports);

module.exports = router;