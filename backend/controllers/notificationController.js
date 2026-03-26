const dotenv = require("dotenv");
dotenv.config();
const notification = require("../models/Notification");

exports.addNotification = async (req, res) => {
  try {
    const { text, persalNumber } = req.body;

    if (!persalNumber || !text) {
      return res.status(400).json({
        success: false,
        message: "Persal number and text are required",
      });
    }

    const result = await notification.addNotification(text, persalNumber);

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

exports.getNotifications = async (req, res) => {
  try {
    const { persal_number: persalNumber } = req.user;

    if (!persalNumber) {
      return res.status(400).json({
        success: false,
        message: "Persal number is required",
        notifications: "",
      });
    }
    const notifications = await notification.getNotifications(persalNumber);
    console.log(notifications);

    notifications.forEach((notification) => {
      notification.read = notification.is_read === 1;
      delete notification.is_read;
    });

    console.log(notifications);

    res.json({
      success: true,
      message: "Notifications successfuly fetched",
      notifications,
    });
  } catch (err) {
    console.error("Get user notifications error", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//used to update a notification(cancel btn)
exports.viewNotification = async (req, res) => {
  try {
    const { id: notificationId } = req.params;
    const { persal_number: persalNumber } = req.user;

    const result = await notification.viewNotification(
      notificationId,
      persalNumber,
    );
    res.json({ success: true, message: "Notification viewed", ...result });
  } catch (err) {
    console.error("View notification error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

//used to view all notifications(Mark as read btn)
exports.viewNotifications = async (req, res) => {
  try {
    const { persal_number: persalNumber } = req.user;

    const result = await notification.viewNotifications(persalNumber);

    res.json({ success: true, message: "Task started", ...result });
  } catch (err) {
    console.error("Start task error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};
