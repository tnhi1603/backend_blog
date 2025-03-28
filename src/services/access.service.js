'use strict'

const bcrypt = require('bcrypt'); //hash password
const crypto = require('crypto'); //create token
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require("../auth/authUtils");
const userModel = require("../models/user.model");

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            //check email co ton tai khong
            const holderShop = await userModel.findOne({email}).lean(); //lean dung de query nhanh hon tra ve object thuan
            if(holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Email already exists',
                }
            }
            //create new shop
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({name, email, password: passwordHash});
        //tao token
            if(newUser) {
                //pulic key(server, verify) and private key(user,sign)
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    // pem format to save to db
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                });
                console.log(privateKey, publicKey); //save collection keystore

                const publicKeyString = await keyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey
                });
    
                if(!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'Create publicKey failed'
                    }
                }
                //create token pair
                const tokens = await createTokenPair({
                    userId: newUser._id,
                    email},
                    publicKeyString,
                    privateKey
                );
                console.log('tokens:', tokens);
                return {
                    code: '201',
                    message: 'Sign up successfully',
                    metadata: {
                        user: newUser,
                        tokens
                    }
                }
            }
            return{
                code: '200',
                metadata: null
            }
        }catch(err) {
            return {
                code: 'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;