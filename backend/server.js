// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const OpenAI = require("openai");
const dotenv = require("dotenv");

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const metricRoutes = require("./routes/metricsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const autoRoutes = require("./routes/automationRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

dotenv.config();
const PORT = process.env.PORT || 3000;
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // MUST be before any routes

// app routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/metric", metricRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/automate", autoRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/automation/start", async (req, res) => {
  try {
    console.log("Request body", req.body);

    const payload = {
      batch_number: req.body.batch_number,
      message: req.body.message,
      triggeredBy: "MANAGER",
    };

    console.log("In the payload", payload);

    const n8nRes = await fetch(
      "https://coursematch-work.app.n8n.cloud/webhook/assign-task",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const text = await n8nRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(n8nRes.status).json(data);
  } catch (error) {
    console.error("Automation trigger failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start automation",
    });
  }
});
