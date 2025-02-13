"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
const authMiddleware = (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    }
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const userId = (0, auth_service_1.verifyToken)(token);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = { id: userId };
    next();
};
exports.authMiddleware = authMiddleware;
