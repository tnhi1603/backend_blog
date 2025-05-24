const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey }) {
    const key = await keyTokenModel.create({
      user: userId,
      publicKey,
      privateKey
    });
    return key.publicKey;
  }

  static async findByUserId(userId) {
    return keyTokenModel.findOne({ user: userId });
  }

  static async updateOrCreateKeyToken({ userId, publicKey, privateKey, accessToken, refreshToken }) {
    const filter = { user: userId };
    const update = {
      publicKey,
      privateKey,
      accessToken,
      refreshToken
    };
    const options = { upsert: true, new: true };
    return keyTokenModel.findOneAndUpdate(filter, update, options);
  }
}

module.exports = KeyTokenService;
