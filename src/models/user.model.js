'use strict'

const { model, Schema, mongoose, Types } = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 300
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
