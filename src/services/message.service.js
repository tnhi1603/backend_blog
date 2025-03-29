'use strict';

const Message = require('../models/message.model');

class MessageService {
    //send message
    async sendMessage(senderId, receiverId, content, attachments = []) {
        if (!content && attachments.length === 0) {
            return { success: false, message: "Tin nhắn không được để trống" };
        }

        const newMessage = await Message.create({ sender: senderId, receiver: receiverId, content, attachments });
        return { success: true, message: "Tin nhắn đã được gửi", data: newMessage };
    }

    //get message
    async getMessages(userId1, userId2) {
        const messages = await Message.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        }).sort({ createdAt: 1 });

        return { success: true, data: messages };
    }

    //delete message
    async deleteMessage(messageId, userId) {
        const message = await Message.findOneAndDelete({ _id: messageId, sender: userId });
        if (!message) {
            return { success: false, message: "Không tìm thấy tin nhắn hoặc bạn không có quyền xóa" };
        }
        return { success: true, message: "Tin nhắn đã bị xóa" };
    }

    //markasread
    async markAsSeen(messageId) {
        try {
            const updatedMessage = await Message.findByIdAndUpdate(
                messageId,
                { seenAt: new Date() },
                { new: true }
            );
            return updatedMessage;
        } catch (error) {
            console.error("Lỗi cập nhật 'Đã xem':", error);
            return null;
        }
    }
}

module.exports = new MessageService();
