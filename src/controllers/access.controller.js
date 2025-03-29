'use strict'

const AccessService = require('../services/access.service');

class AccessController{
    signUp = async (req, res, next) => {
        try{
            console.log(`[P]::signUp::`, req.body);
            return res.status(201).json(await AccessService.signUp(req.body));
        }catch(err){
            next(err);
        }
    }

    login = async (req, res, next) => {
        try {
            console.log(`[P]::login::`, req.body);
            return res.status(200).json(await AccessService.login(req.body));
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new AccessController();