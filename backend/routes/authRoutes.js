const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// user routes
router.post('/user', authController.addUser);
router.post('/login', authController.login);

router.get("/users", authController.getUsers);
router.delete("/user/:persal", authController.deleteUser);
router.patch("/user/:persal", authController.updateRole);
router.get("/workers", authController.getWorkers);

module.exports = router;
