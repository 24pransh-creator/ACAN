const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },

    mobile: {
      type: String,
    },

    trainNumber: {
      type: String,
    },

    zoneDivision: {
      type: String,
    },

    role: {
      type: String,
      enum: [
        "superadmin",
        "railway",
        "forest",
        "viewer",
        "train_driver"
      ],
      default: "viewer",
    },

    language: {
      type: String,
      default: "English",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);