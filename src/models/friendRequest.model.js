'use strict'

const { model, Schema, mongoose } = require('mongoose');

const DOCUMENT_NAME = 'FriendRequest';
const COLLECTION_NAME = 'FriendRequests';

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, friendRequestSchema);
