'use strict';

const NotificationService = require('../services/notification.service');

class NotificationController {
    async getNotifications(req, res) {
        const userId = req.user._id; // middleware auth gán user
        const response = await NotificationService.getNotifications(userId);
        res.status(response.success ? 200 : 500).json(response);
    }

    async markAsRead(req, res) {
        const notificationId = req.params.id;
        const response = await NotificationService.markAsRead(notificationId);
        res.status(response.success ? 200 : 500).json(response);
    }
}

module.exports = new NotificationController();
