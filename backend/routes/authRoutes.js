const express = require("express");

const router = express.Router();

const {
  login,
  signup,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);

router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;