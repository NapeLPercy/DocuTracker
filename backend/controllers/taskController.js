const dotenv = require("dotenv");
dotenv.config(); // controllers/taskController.js
const Task = require("../models/Task");

exports.assignTask = async (req, res) => {
  try {
    const taskData = req.body;
    const result = await Task.assignTask(taskData);
    res.json({
      success: true,
      message: "Task assigned successfully",
      taskId: result.taskId,
    });
  } catch (err) {
    console.error("Assign task error:", err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Server error" });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const { persal, role } = req.query;
    console.log(persal, role);

    if (!persal || !role) {
      return res.json({
        success: false,
        message: "Persal number and role are required",
      });
    }
    const tasks = await Task.getUserTasks(persal, role);

    res.json({ success: true, tasks });
  } catch (err) {
    console.error("Get user tasks error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.startTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { persal_number: persalNumber } = req.user;

    const result = await Task.startTask(taskId, persalNumber);
    res.json({ success: true, message: "Task started", ...result });
  } catch (err) {
    console.error("Start task error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.endTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { persal_number: persalNumber } = req.user;

    const result = await Task.endTask(taskId, persalNumber);
    res.json({ success: true, message: "Task ended", ...result });
  } catch (err) {
    console.error("End task error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { status } = req.body;
    const { persal_number: persalNumber, role } = req.user;

    if (!persalNumber || !role) {
      return res.json({ message: "Missing required fields", success: false });
    }

    if (role !== "MANAGER" && role !== "RUNNER") {
      return res.json({ message: "Unauthorized access", success: false });
    }

    const result = await Task.updateTask(taskId, status);

    res.json({
      success: true,
      message: "Task successfully updated",
      ...result,
    });
  } catch (err) {
    console.error("Start task error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.reportTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { data: reportData } = req.body;

    console.log("jer is the data", reportData);
    const result = await Task.reportTask(taskId, reportData);
    res.json({ success: true, message: "Report created", ...result });
  } catch (err) {
    console.error("Report task error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { role } = req.user;

    console.log(req.user);
    if (!role) {
      return res.json({
        success: false,
        message: "Persal number and role are required",
      });
    }

    console.log("Role", role);

    if (role !== "MANAGER" && role !== "RUNNER") {
      return res.json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const tasks = await Task.getUserTasks("", role);

    res.json({ success: true, tasks });
  } catch (err) {
    console.error("Get user tasks error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
