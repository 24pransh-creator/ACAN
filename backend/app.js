const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const createSuperAdmin = require("./utils/createSuperAdmin");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();
createSuperAdmin();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "Animal Crossing Alert Network (ACAN)",
    status: "Running",
    database: "MongoDB Atlas"
  });
});

module.exports = app;