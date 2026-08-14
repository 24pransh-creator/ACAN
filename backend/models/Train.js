const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: String,
      required: true,
      unique: true,
    },

    trainName: {
      type: String,
      required: true,
    },

    driverName: {
      type: String,
      default: "",
    },

    zoneDivision: {
      type: String,
      default: "",
    },

    route: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Running",
        "Stopped",
        "Maintenance",
      ],
      default: "Running",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Train",
  trainSchema
);