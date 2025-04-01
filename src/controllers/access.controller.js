'use strict';

const AccessService = require('../services/access.service');

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            const result = await AccessService.signUp(req.body);
            return res.status(result.code).json(result);
        } catch (err) {
            next(err);
        }
    };

    login = async (req, res, next) => {
        try {
            console.log(`[P]::login::`, req.body);
            const result = await AccessService.login(req.body);
            return res.status(result.code).json(result);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new AccessController();
