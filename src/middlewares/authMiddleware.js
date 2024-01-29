const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    
    const publicRoutes = ['/', '/login', '/userRegistration'];
    
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const cookie = req.cookies.jwtToken;

    if(cookie) {
        jwt.verify(cookie, process.env.TOKEN_SECRET, (err, decoded)=>{
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired refresh token' });
            } else {
                return next();
            }
        });       
    } else {        
        return res.status(401);
    }
}

module.exports = {authenticateToken};