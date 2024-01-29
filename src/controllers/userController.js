const express = require('express');
const router = express.Router();
require('dotenv').config();
const userService = require('../services/userService');
const User = require('../models/User');

router.get('/user/menu', (req, res, next) => {
    res.render('menu.ejs');
});

router.get('/userRegistration', (req, res, next) => {
    res.render('userRegister.ejs');
});

router.post('/user/userRegistration', (req, res, next) => {
    const {user, email, password} = req.body;

    let userModel = new User(user, email, password);

    userService.insertUser(userModel);
});

module.exports = router;