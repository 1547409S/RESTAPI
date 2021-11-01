// middleware to check the valid token to restrict certain requests
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log('token: ' + token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: error,
            message: 'Login failed-4'
        });
        
    }
};