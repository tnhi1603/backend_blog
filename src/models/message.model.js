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
    attachments: [
        {
            fileName: String,  // Tên file
            filePath: String,  // Đường dẫn lưu file cục bộ (VD: uploads/messages/)
            fileType: String   // Loại file (image, video, document,...)
        }
    ],
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, messageSchema);
