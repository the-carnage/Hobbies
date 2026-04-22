const { db } = require('../config/firebase');
const PostService = require('../services/postService');

class PostController {
    constructor(postService) {
        this.postService = postService;
        this.createPost = this.createPost.bind(this);
        this.getFeed = this.getFeed.bind(this);
    }

    async createPost(req, res) {
        try {
            const post = await this.postService.createPost(req.body);
            return res.status(201).json(post);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async getFeed(req, res) {
        try {
            const posts = await this.postService.getFeed();
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController(new PostService(db));
