'use strict';

const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/message.controller');

// send message
router.post('/send', messageController.sendMessage);

// get messages
router.get('/:userId1/:userId2', messageController.getMessages);

// delete message
router.delete('/delete', messageController.deleteMessage);

// mark as read
router.put('/read/:messageId', messageController.markAsSeen);

module.exports = router;
