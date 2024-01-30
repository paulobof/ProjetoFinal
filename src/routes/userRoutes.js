const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para CRUD
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/user/menu', userController.renderMenuPage);
router.get('/userRegistration', userController.renderUserRegistrationPage);
router.post('/user/userRegistration', userController.handleUserRegistration);

module.exports = router;