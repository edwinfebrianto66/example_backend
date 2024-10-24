// routes/login.routes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// Route untuk login
router.post('/', loginController.login);

module.exports = router;
