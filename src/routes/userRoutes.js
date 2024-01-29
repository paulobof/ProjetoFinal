const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user/menu', userController.renderMenuPage);
router.get('/userRegistration', userController.renderUserRegistrationPage);
router.post('/user/userRegistration', userController.handleUserRegistration);

module.exports = router;