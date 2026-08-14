const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cameraRoutes = require("./routes/cameraRoutes");
require("dotenv").config();

const connectDB = require("./config/db");
const createSuperAdmin = require("./utils/createSuperAdmin");

// Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const trainRoutes = require("./routes/trainRoutes");

// Database Connection
connectDB();

// Create Default Super Admin
createSuperAdmin();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/cameras", cameraRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    app: "Animal Crossing Alert Network (ACAN)",
    status: "Running",
    database: "MongoDB Atlas",
  });
});

module.exports = app;