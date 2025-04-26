'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../../controllers/post.controller');

// Định nghĩa API bài viết
router.post('/create', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:postId', postController.getPostById);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', postController.updatePost);
router.put('/:postId/like', postController.toggleLikePost);
router.post('/:postId/comment', postController.commentPost);

module.exports = router;
