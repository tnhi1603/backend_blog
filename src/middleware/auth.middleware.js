// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const keyTokenService = require('../services/keyToken.service');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.decode(token); // dùng decode để lấy userId trước
        const keyStore = await keyTokenService.findByUserId(decoded.userId);
        if (!keyStore) return res.status(403).json({ message: 'Invalid key store' });

        const verified = jwt.verify(token, keyStore.publicKey); // dùng verify với publicKey
        req.user = await userModel.findById(verified.userId).select('-password');
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};

module.exports = authMiddleware;
