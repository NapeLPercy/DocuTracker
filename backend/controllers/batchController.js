const batch = require("../models/Batch");

exports.addBatch = async (req, res) => {
  const { role, persal_number: persalNumber } = req.user;
  const { batchNumber } = req.body;

  if (!role || !persalNumber) {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  if (!batchNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Batch number is required" });
  }

  try {
    await batch.addBatch(batchNumber, persalNumber);

    res.json({ success: true, message: "Batch added successfuly" });
  } catch (err) {
    console.error("Error adding a batch:", err);
    res.status(500).json({ error: "Database error" });
  }
};

exports.getAllBatch = async (req, res) => {
  const { role, persal_number: persalNumber } = req.user;
  const { status } = req.query;

  if (!role || !persalNumber) {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  if (!batchNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Status number is required" });
  }

  try {
    const results = await batch.getAllBatch(status);

    res.json({ success: true, message: "Batch successfuly fetched" });
  } catch (err) {
    console.error("Error adding a batch:", err);
    res.status(500).json({ error: "Database error" });
  }
};
