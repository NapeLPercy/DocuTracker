const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const { requireAuth, requireRole } = require("../middleware/accessControl");

// task routes
router.post("/assign", taskController.assignTask);
router.get("/", taskController.getUserTasks);
router.get("/all",requireAuth, taskController.getAllTasks);
router.patch("/:id/start", requireAuth, taskController.startTask);
router.patch("/:id/status",requireAuth, taskController.updateStatus);
router.patch("/:id/end", requireAuth, taskController.endTask);
router.post("/:id/report", taskController.reportTask);

module.exports = router;
