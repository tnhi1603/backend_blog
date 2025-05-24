'use strict';

const Notification = require('../models/notification.model');

class NotificationService {
    async createNotification(data) {
        try {
            const newNotification = await Notification.create(data);
            return { success: true, data: newNotification };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getNotifications(userId) {
        try {
            const notifications = await Notification.find({ recipient: userId })
                .sort({ createdAt: -1 })
                .populate('sender', 'name avatar')
                .populate('post', 'content')
                .populate('message', 'content');
            return { success: true, data: notifications };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async markAsRead(notificationId) {
        try {
            const updated = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
            if (!updated) return { success: false, message: 'Không tìm thấy thông báo' };
            return { success: true, data: updated };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new NotificationService();
