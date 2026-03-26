const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

// batch routes
router.post('/', batchController.addBatch);
router.get("/all",batchController.getAllBatch);
module.exports = router;