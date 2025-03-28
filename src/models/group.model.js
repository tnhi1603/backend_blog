'use strict'

const { model, Schema, mongoose } = require('mongoose');

const DOCUMENT_NAME = 'Group';
const COLLECTION_NAME = 'Groups';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 150
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                type: String,
                enum: ['member', 'admin'],
                default: 'member'
            }
        }
    ],
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, groupSchema);
