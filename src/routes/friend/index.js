'use strict';

const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friend.controller');

// Gửi lời mời kết bạn
router.post('/send', friendController.sendFriendRequest);

// Chấp nhận lời mời kết bạn
router.put('/accept/:requestId', friendController.acceptFriendRequest);

// Từ chối lời mời kết bạn
router.put('/reject/:requestId', friendController.rejectFriendRequest);

// Hủy kết bạn
router.delete('/unfriend', friendController.unfriend);

// Lấy danh sách bạn bè
router.get('/list/:userId', friendController.getFriends);

module.exports = router;
