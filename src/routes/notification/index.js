'use strict';

const express = require('express');
const NotificationController = require('../../controllers/notification.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();

// GET /notifications - lấy danh sách thông báo của user hiện tại
router.get('/', authMiddleware, NotificationController.getNotifications);

// PUT /notifications/:id/read - đánh dấu đã đọc
router.put('/:id/read', authMiddleware, NotificationController.markAsRead);

module.exports = router;
