'use strict'

const { model, Schema, mongoose, Types } = require('mongoose');

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

var postSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    image: {
        type: String,
        default: null
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: { type: Types.ObjectId, ref: 'User' },
        content: { type: String, trim: true, maxLength: 500 },
        createdAt: { type: Date, default: Date.now }
    }],
    visibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);
