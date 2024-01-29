require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');


function login(email, password){
    const { EMAIL, PASSWORD } = process.env;    
    
    if(email === EMAIL && password === PASSWORD){
                
        console.log('Login bem-sucedido!');

        const jwtToken = generateAccessToken({ email: email });
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
}

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '10800s' });
}

function logout(req, res) {
    const { cookies } = req;
    const jwt = cookies.jwtToken;

    const cookieOptions = {
        secure: true,
        httpOnly: true,
        maxAge: -1,
    };

    if (!jwt) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        });
    }

    const cookieSerialized = cookie.serialize('jwtToken', null, cookieOptions);

    res.setHeader('Set-Cookie', cookieSerialized);
    res.json({ success: true });
}


module.exports = {login, logout};