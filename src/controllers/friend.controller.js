'use strict';

const FriendService = require('../services/friend.service');

class FriendController {
    async sendFriendRequest(req, res) {
        const { senderId, receiverId } = req.body;
        const response = await FriendService.sendFriendRequest(senderId, receiverId);
        res.status(response.success ? 201 : 400).json(response);
    }

    async acceptFriendRequest(req, res) {
        const response = await FriendService.acceptFriendRequest(req.params.requestId);
        res.status(response.success ? 200 : 400).json(response);
    }

    async rejectFriendRequest(req, res) {
        const response = await FriendService.rejectFriendRequest(req.params.requestId);
        res.status(response.success ? 200 : 400).json(response);
    }

    async unfriend(req, res) {
        const { userId1, userId2 } = req.body;
        const response = await FriendService.unfriend(userId1, userId2);
        res.status(response.success ? 200 : 400).json(response);
    }

    async getFriends(req, res) {
        const response = await FriendService.getFriends(req.params.userId);
        res.status(response.success ? 200 : 400).json(response);
    }
}

module.exports = new FriendController();

