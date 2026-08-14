const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
  {
    cameraName: {
      type: String,
      required: true,
    },

    cameraId: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
    },

    railwayZone: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },

    streamUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Camera", cameraSchema);