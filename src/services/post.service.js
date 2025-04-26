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
                .populate('user', 'name avatar')           // lấy thông tin người đăng bài
                .populate('likes', 'name avatar')           // lấy thông tin người đã like
                .populate('comments.user', 'name avatar')   // lấy thông tin user của từng comment
                .sort({ createdAt: -1 });
    
            const formattedPosts = posts.map(post => ({
                _id: post._id,
                user: post.user,
                content: post.content,
                image: post.image,
                likeCount: post.likes.length,
                likes: post.likes, // danh sách user đã like
                comments: post.comments.map(comment => ({
                    _id: comment._id,
                    user: comment.user,
                    content: comment.content,
                    createdAt: comment.createdAt
                })),
                visibility: post.visibility,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }));
    
            return { success: true, data: formattedPosts };
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

    async updatePost(postId, updateData) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                return { success: false, message: "Không tìm thấy bài viết" };
            }
    
            // Update các trường cho phép
            if (updateData.content !== undefined) {
                post.content = updateData.content;
            }
            if (updateData.image !== undefined) {
                post.image = updateData.image;
            }
            if (updateData.visibility !== undefined) {
                post.visibility = updateData.visibility;
            }
    
            await post.save();
    
            return { success: true, message: "Bài viết đã được cập nhật", data: post };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }    

    // like / unlike post
    async toggleLikePost(postId, userId) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                return { success: false, message: "Không tìm thấy bài viết" };
            }

            const alreadyLiked = post.likes.includes(userId);

            if (alreadyLiked) {
                post.likes.pull(userId); // unlike
            } else {
                post.likes.push(userId); // like
            }

            await post.save();

            return {
                success: true,
                message: alreadyLiked ? "Đã bỏ thích bài viết" : "Đã thích bài viết",
                likesCount: post.likes.length
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // comment post
    async commentPost(postId, commentData) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                return { success: false, message: "Không tìm thấy bài viết" };
            }

            const newComment = {
                user: commentData.userId,
                content: commentData.content
            };

            post.comments.push(newComment);

            await post.save();

            return { success: true, message: "Bình luận đã được thêm", comments: post.comments };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new PostService();
