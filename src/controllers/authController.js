const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authService = require('../services/authService');

dotenv.config();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', async (req, res) => {    
    const { email, password } = req.body;

    try {
        const cookieString = await authService.login(email, password);

        if (!cookieString) {
            return res.redirect('/');
        }

        res.setHeader('Set-Cookie', cookieString);
        res.redirect('/user/menu');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/logout', (req, res) => {
    authService.logout(req, res);
});

module.exports = router;
