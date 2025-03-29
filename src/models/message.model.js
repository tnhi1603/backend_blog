'use strict'

const { model, Schema, mongoose } = require('mongoose');

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

const messageSchema = new mongoose.Schema({
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
    content: {
        type: String,
        trim: true
    },
    attachments: [{ type: String }],
    seenAt: { type: Date, default: null }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, messageSchema);
