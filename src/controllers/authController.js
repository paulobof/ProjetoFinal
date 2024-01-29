// authService.js
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { EMAIL, PASSWORD, TOKEN_SECRET } = process.env;

async function login(email, password) {
    try {
        if (email === EMAIL && password === PASSWORD) {
            console.log('Login bem-sucedido!');

            const jwtToken = generateAccessToken({ email });
            const cookieOptions = {
                secure: true,
                httpOnly: true,
                maxAge: 10800,
            };

            const cookieSerialized = cookie.serialize('jwtToken', jwtToken, cookieOptions);

            return cookieSerialized;
        } else {
            console.log('Erro no login!');
            return null;
        }
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
}

function generateAccessToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '10800s' });
}

function logout(req, res) {
    try {
        const { cookies } = req;
        const jwtToken = cookies.jwtToken;

        const cookieOptions = {
            secure: true,
            httpOnly: true,
            maxAge: -1,
        };

        if (!jwtToken) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized',
            });
        }

        const cookieSerialized = cookie.serialize('jwtToken', null, cookieOptions);

        res.setHeader('Set-Cookie', cookieSerialized);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { login, logout };
