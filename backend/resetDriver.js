require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function resetDriver() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash(
      process.env.RESET_DRIVER_PASSWORD,
      10
    );

    const user = await User.findOneAndUpdate(
      { email: "24pransh@gmail.com" },
      {
        password: hashedPassword,
        role: "train_driver",
        employeeId: "00001",
        mobile: "9182736405",
        trainNumber: "962011",
        zoneDivision: "Junagadh",
        isActive: true,
      },
      { new: true }
    );

    if (!user) {
      console.log("Driver user not found");
    } else {
      console.log("Train Driver updated successfully");
      console.log("Name:", user.fullName);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
      console.log("Employee ID:", user.employeeId);
      console.log("Train Number:", user.trainNumber);
      console.log("Zone/Division:", user.zoneDivision);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Reset failed:", error.message);
    process.exit(1);
  }
}

resetDriver();