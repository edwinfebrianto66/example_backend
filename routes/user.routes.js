// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth'); // Middleware untuk verifikasi token

// Route to get all users
router.get('/', verifyToken, userController.getAllUsers);

// Route to create a new user
router.post('/', verifyToken, userController.createUser);

module.exports = router;