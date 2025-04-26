'use strict';

const PostService = require('../services/post.service');

class PostController {
    async createPost(req, res) {
        const response = await PostService.createPost(req.body);
        res.status(response.success ? 201 : 500).json(response);
    }

    async getPosts(req, res) {
        const { userId } = req.query;
        const response = await PostService.getPosts(userId);
        res.status(response.success ? 200 : 500).json(response);
    }

    async getPostById(req, res) {
        const response = await PostService.getPostById(req.params.postId);
        res.status(response.success ? 200 : 500).json(response);
    }

    async deletePost(req, res) {
        const response = await PostService.deletePost(req.params.postId);
        res.status(response.success ? 200 : 500).json(response);
    }

    async updatePost(req, res) {
        const response = await PostService.updatePost(req.params.postId, req.body);
        res.status(response.success ? 200 : 500).json(response);
    }

    async toggleLikePost(req, res) {
        const { postId } = req.params;
        const { userId } = req.body;  // userId truyền trong body
        const response = await PostService.toggleLikePost(postId, userId);
        res.status(response.success ? 200 : 500).json(response);
    }

    async commentPost(req, res) {
        const { postId } = req.params;
        const { userId, content } = req.body; // userId và nội dung bình luận trong body
        const response = await PostService.commentPost(postId, { userId, content });
        res.status(response.success ? 200 : 500).json(response);
    }
}

module.exports = new PostController();
