'use strict';

const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'notifications';

const notificationSchema = new Schema({
  recipient: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'message'],
    required: true
  },
  post: {
    type: Types.ObjectId,
    ref: 'Post',
    default: null
  },
  message: {
    type: Types.ObjectId,
    ref: 'Message',
    default: null
  },
  sender: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, notificationSchema);
