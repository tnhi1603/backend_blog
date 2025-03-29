'use strict';

const socketIo = require('socket.io');
const Message = require('./../models/message.model');

let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Nhận sự kiện "Đang nhập..."
        socket.on('typing', ({ senderId, receiverId }) => {
            io.emit(`typing-${receiverId}`, { senderId });
        });
    
        // Nhận sự kiện "Dừng nhập..."
        socket.on('stopTyping', ({ senderId, receiverId }) => {
            io.emit(`stopTyping-${receiverId}`, { senderId });
        });

        // Lắng nghe sự kiện gửi tin nhắn
        socket.on('sendMessage', async (message) => {
            console.log("New message received:", message);

            // Lưu tin nhắn vào database
            const newMessage = await Message.create({
                sender: message.senderId,
                receiver: message.receiverId,
                content: message.content,
                attachments: message.attachments || []
            });

            // Gửi tin nhắn realtime đến cả người gửi và người nhận
            io.emit(`receiveMessage-${message.receiverId}`, newMessage);
            io.emit(`receiveMessage-${message.senderId}`, newMessage);
            io.emit(`notification-${receiverId}`, {
                type: "newMessage",
                message: `Bạn có tin nhắn mới từ ${senderId}: "${content}"`,
                messageId: newMessage._id,
                senderId
            });
        });

        // Nhận sự kiện "Đã xem"
        socket.on('markAsSeen', async ({ messageId, receiverId }) => {
            try {
                await Message.findByIdAndUpdate(messageId, { seenAt: new Date() });

                // Gửi thông báo "Đã xem" đến người gửi
                io.emit(`messageSeen-${receiverId}`, { messageId, seenAt: new Date() });
            } catch (error) {
                console.error("Lỗi cập nhật 'Đã xem':", error);
            }
        });

        // Ngắt kết nối
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO chưa được khởi tạo!");
    }
    return io;
};

module.exports = { initializeSocket, getIo };
