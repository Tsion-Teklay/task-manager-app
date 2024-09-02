const jwt = require('jsonwebtoken');
require('dotenv').config();

function authorize(requiredRole) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (requiredRole) {
                if (decoded.role !== requiredRole && decoded.role !== 'admin') {
                    return res.status(403).json({ error: 'Forbidden: You do not have access' });
                }
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(400).json({ error: 'Invalid token' });
        }
    };
}

module.exports = authorize;
