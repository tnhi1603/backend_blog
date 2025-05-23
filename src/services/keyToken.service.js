//generate token
"use strict";

const keyTokenModel = require("../models/keyToken.model");

class keyTokenService {
    static createKeyToken = async ({userId, publicKey}) => {
        try{
            const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({user: userId, publicKey: publicKeyString});
        return tokens? publicKeyString: null;
        }
        catch(err){
            return err;
        }
    }
    static async findByUserId(userId) {
        return await keyTokenModel.findOne({ user: userId });
    }
}
module.exports = keyTokenService;