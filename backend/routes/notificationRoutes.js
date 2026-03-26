const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const {requireAuth, requireRole} = require("../middleware/accessControl");

// task routes
router.post("/", notificationController.addNotification);
router.get("/",requireAuth, notificationController.getNotifications);
router.patch("/all",requireAuth, notificationController.viewNotifications);
router.patch("/:id", requireAuth, notificationController.viewNotification);

module.exports = router;