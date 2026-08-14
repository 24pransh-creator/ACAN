const express = require("express");

const router = express.Router();

const {
  getTrains,
  getTrain,
  addTrain,
  updateTrain,
  deleteTrain,
} = require("../controllers/trainController");

// ================= GET ALL TRAINS =================
router.get("/", getTrains);

// ================= GET SINGLE TRAIN =================
router.get("/:id", getTrain);

// ================= ADD TRAIN =================
router.post("/", addTrain);

// ================= UPDATE TRAIN =================
router.put("/:id", updateTrain);

// ================= DELETE TRAIN =================
router.delete("/:id", deleteTrain);

module.exports = router;