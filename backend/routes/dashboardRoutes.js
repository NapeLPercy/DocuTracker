const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { requireAuth, requireRole } = require("../middleware/accessControl");

/* "INDEXER", label: "Indexer" },
  { value: "CREATOR", label: "Batch Creator" },
  { value: "ASSEMBLER", label: "Assembler" },
  { value: "QC", label: "QC" },
  { value: "SCANNER", label: "Scanner" },
  { value: "RUNNER", label: "Runner" },
  { value: "TECH-SUPPORT" */
router.get(
  "/personell",
  requireAuth,
  requireRole(["CREATOR","INDEXER", "ASSEMBLER", "QC", "SCANNER", "TECH-SUPPORT"]),
  dashboardController.getPersonellDashboard,
);
router.get(
  "/admin",
  requireAuth,
  requireRole(["MANAGER", "RUNNER"]),
  dashboardController.getAdminDashboard,
);

module.exports = router;
