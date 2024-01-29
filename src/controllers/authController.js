const express = require('express');
const router = express.Router();
require('dotenv').config();
const authService = require('../services/authService');

router.get('/', (req, res, next) => {
    res.render('login.ejs');
});

router.post('/login', (req, res, next) => {    
    const {email, password} = req.body;    

    let cookieString = authService.login(email, password);

    if(cookieString == null){
        return res.redirect('/');
    } else {
        res.setHeader('Set-Cookie', cookieString);
        res.redirect('/user/menu');
    }

});

router.post('/logout', (req, res, next) => {
    authService.logout(req, res);
});

module.exports = router;