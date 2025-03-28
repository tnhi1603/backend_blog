'use strict';

const Post = require('../models/post.model');

class PostService {
    //create post
    async createPost(postData) {
        try {
            const newPost = new Post(postData);
            await newPost.save();
            return { success: true, message: "Bài viết đã được đăng", data: newPost };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    //get post list
    async getPosts(userId) {
        try {
            const query = userId ? { user: userId } : {};
            const posts = await Post.find(query)
                .populate('user', 'name avatar') // Lấy thông tin user (chỉ name, avatar)
                .sort({ createdAt: -1 });

            return { success: true, data: posts };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    //delete post
    async deletePost(postId) {
        try {
            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost) {
                return { success: false, message: "Không tìm thấy bài viết" };
            }
            return { success: true, message: "Bài viết đã bị xóa" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new PostService();
