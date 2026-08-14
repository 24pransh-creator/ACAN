const express = require("express");

const router = express.Router();

const {
  getCameras,
  getCamera,
  addCamera,
  updateCamera,
  deleteCamera,
} = require("../controllers/cameraController");

// ================= GET ALL CAMERAS =================
router.get("/", getCameras);

// ================= GET SINGLE CAMERA =================
router.get("/:id", getCamera);

// ================= ADD CAMERA =================
router.post("/", addCamera);

// ================= UPDATE CAMERA =================
router.put("/:id", updateCamera);

// ================= DELETE CAMERA =================
router.delete("/:id", deleteCamera);

module.exports = router;