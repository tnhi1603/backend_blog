'use strict';

const FriendRequest = require('../models/friendRequest.model');
const User = require('../models/user.model');

class FriendService {
//send request
    async sendFriendRequest(senderId, receiverId) {
        if (senderId === receiverId) {
            return { success: false, message: "Bạn không thể kết bạn với chính mình" };
        }

        const existingRequest = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
        if (existingRequest) {
            return { success: false, message: "Bạn đã gửi lời mời trước đó" };
        }

        const newRequest = await FriendRequest.create({ sender: senderId, receiver: receiverId });
        return { success: true, message: "Lời mời kết bạn đã được gửi", data: newRequest };
    }

    //accept friend request
    async acceptFriendRequest(requestId) {
        const request = await FriendRequest.findByIdAndUpdate(
            requestId, { status: 'accepted' }, { new: true }
        );
        if (!request) {
            return { success: false, message: "Không tìm thấy lời mời kết bạn" };
        }
        return { success: true, message: "Lời mời kết bạn đã được chấp nhận", data: request };
    }

    //decline friend request
    async rejectFriendRequest(requestId) {
        const request = await FriendRequest.findByIdAndUpdate(
            requestId, { status: 'rejected' }, { new: true }
        );
        if (!request) {
            return { success: false, message: "Không tìm thấy lời mời kết bạn" };
        }
        return { success: true, message: "Lời mời kết bạn đã bị từ chối" };
    }

    //unfriend
    async unfriend(userId1, userId2) {
        const request = await FriendRequest.findOneAndDelete({
            $or: [
                { sender: userId1, receiver: userId2, status: 'accepted' },
                { sender: userId2, receiver: userId1, status: 'accepted' }
            ]
        });

        if (!request) {
            return { success: false, message: "Không phải bạn bè" };
        }
        return { success: true, message: "Đã hủy kết bạn" };
    }

    //get friend list
    async getFriends(userId) {
        const friends = await FriendRequest.find({
            $or: [{ sender: userId }, { receiver: userId }],
            status: 'accepted'
        }).populate('sender receiver', 'name email');

        const friendList = friends.map(friend => {
            return friend.sender._id.toString() === userId ? friend.receiver : friend.sender;
        });

        return { success: true, data: friendList };
    }
}

module.exports = new FriendService();
