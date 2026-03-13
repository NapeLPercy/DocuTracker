const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const {requireAuth} = require("../middleware/accessControl");
router.get("/", requireAuth,reportController.getUserReports);

module.exports = router;
