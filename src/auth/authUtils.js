'use strict'
const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try{
        //tao access token thong qua private key
        const accessToken = await JWT.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '1d'});
        const refreshToken = await JWT.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});
        JWT.verify(accessToken, publicKey, (err,decode) => {
            // if(err) {
            //     console.error(`err `, err);
            // }else{
            //     console.log(`decode`, decode);
            // }
        });
        return {accessToken, refreshToken};
    }catch(err){
        
    }
}

module.exports = {  createTokenPair };