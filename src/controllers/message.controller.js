'use strict';

const MessageService = require('../services/message.service');
const { getIo } = require('../socket/socket'); 

class MessageController {
    async sendMessage(req, res) {
        const { senderId, receiverId, content, attachments } = req.body;
        const response = await MessageService.sendMessage(senderId, receiverId, content, attachments);

        if (response.success) {
            const io = getIo();
            io.emit(`receiveMessage-${receiverId}`, response.data);
            io.emit(`receiveMessage-${senderId}`, response.data);
        }

        res.status(response.success ? 201 : 400).json(response);
    }

    async markAsSeen(req, res) {
        const { messageId } = req.params;
        const { receiverId } = req.body;
    
        try {
            const updatedMessage = await MessageService.markAsSeen(messageId);
    
            if (!updatedMessage) {
                return res.status(404).json({ success: false, message: "Tin nhắn không tồn tại!" });
            }
    
            const io = getIo();
            io.emit(`messageSeen-${receiverId}`, { messageId, seenAt: updatedMessage.seenAt });
    
            res.status(200).json({ success: true, message: "Đã xem tin nhắn.", data: updatedMessage });
        } catch (error) {
            res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
        }
    }
    

    async getMessages(req, res) {
        const { userId1, userId2 } = req.params;
        const response = await MessageService.getMessages(userId1, userId2);
        res.status(response.success ? 200 : 400).json(response);
    }

    async deleteMessage(req, res) {
        const { messageId, userId } = req.body;
        const response = await MessageService.deleteMessage(messageId, userId);
        res.status(response.success ? 200 : 400).json(response);
    }
}

module.exports = new MessageController();
