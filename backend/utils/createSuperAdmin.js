const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createSuperAdmin = async () => {
  try {
    const admin = await User.findOne({
      role: "superadmin",
    });

    if (admin) {
      console.log("✅ Super Admin Already Exists");
      return;
    }

    const password = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullName: "Super Admin",
      email: "admin@acan.in",
      password,
      role: "superadmin",
    });

    console.log("✅ Super Admin Created");
    console.log("Email : admin@acan.in");
    console.log("Password : Admin@123");

  } catch (err) {
    console.log(err.message);
  }
};

module.exports = createSuperAdmin;