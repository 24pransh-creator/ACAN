const Train = require("../models/Train");

// ===============================
// GET ALL TRAINS
// ===============================
const getTrains = async (req, res) => {
  try {
    const trains = await Train.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trains.length,
      trains,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE TRAIN
// ===============================
const getTrain = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    res.json({
      success: true,
      train,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADD TRAIN
// ===============================
const addTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);

    res.status(201).json({
      success: true,
      message: "Train added successfully",
      train,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE TRAIN
// ===============================
const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    res.json({
      success: true,
      message: "Train updated successfully",
      train,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE TRAIN
// ===============================
const deleteTrain = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    await Train.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Train deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTrains,
  getTrain,
  addTrain,
  updateTrain,
  deleteTrain,
};