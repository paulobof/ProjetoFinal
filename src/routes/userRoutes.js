const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/menu', userController.renderMenuPage);
router.get('/userRegistration', userController.renderUserRegistrationPage);
router.post('/userRegistration', userController.handleUserRegistration);

module.exports = router;