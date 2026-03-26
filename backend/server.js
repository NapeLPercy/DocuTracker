const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const metricRoutes = require("./routes/metricsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const autoRoutes = require("./routes/automationRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const batchRoutes = require("./routes/batchRoutes");
dotenv.config();
const PORT = process.env.PORT || 3000;
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// app routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/metric", metricRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/automate", autoRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/batches", batchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


