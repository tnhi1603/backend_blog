'use strict';
const JWT = require('jsonwebtoken');

const createTokenPair = (payload, publicKey, privateKey) => {
    try {
        // Tạo access token (1 ngày)
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1d'
        });

        // Tạo refresh token (7 ngày)
        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        });

        // Kiểm tra access token có hợp lệ không (debug)
        const decoded = JWT.verify(accessToken, publicKey);
        console.log('Token created. Decoded payload:', decoded);

        return { accessToken, refreshToken };
    } catch (err) {
        console.error('Failed to create token pair:', err.message);
        throw new Error('Create token pair failed: ' + err.message);
    }
};

module.exports = { createTokenPair };
