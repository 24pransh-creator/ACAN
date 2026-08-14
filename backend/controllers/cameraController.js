const Camera = require("../models/Camera");

// ===============================
// GET ALL CAMERAS
// ===============================
const getCameras = async (req, res) => {
  try {
    const cameras = await Camera.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cameras.length,
      cameras,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE CAMERA
// ===============================
const getCamera = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.json({
      success: true,
      camera,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADD CAMERA
// ===============================
const addCamera = async (req, res) => {
  try {
    const camera = await Camera.create(req.body);

    res.status(201).json({
      success: true,
      message: "Camera added successfully",
      camera,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE CAMERA
// ===============================
const updateCamera = async (req, res) => {
  try {
    const camera = await Camera.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.json({
      success: true,
      message: "Camera updated successfully",
      camera,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE CAMERA
// ===============================
const deleteCamera = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    await Camera.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Camera deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCameras,
  getCamera,
  addCamera,
  updateCamera,
  deleteCamera,
};