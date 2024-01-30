const express = require('express');
const router = express.Router();
require('dotenv').config();
const authController = require('../controllers/authController');

router.get('/', authController.renderLoginPage );

router.post('/login', authController.login );

router.post('/logout', authController.logout );

module.exports = router;