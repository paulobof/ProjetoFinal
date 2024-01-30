const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const publicRoutes = ['/', '/login', '/user/userRegistration', '/logout'];

    console.log('Request Path:', req.path);

    if (publicRoutes.includes(req.path) || publicRoutes.some(route => req.path.startsWith(route))) {
        console.log('Public route. Skipping authentication.');
        return next();
    }

    const cookie = req.cookies.jwtToken;

    if (!cookie) {
        console.log('Missing refresh token. Unauthorized.');
        return res.status(401).json({ error: 'Missing refresh token' });
    }

    jwt.verify(cookie, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid or expired refresh token. Unauthorized.');
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        console.log('Authentication successful. Decoded user:', decoded);
        req.user = decoded;
        next();
    });
}

module.exports =  {authenticateToken} ;
