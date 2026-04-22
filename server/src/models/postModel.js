class Post {
    constructor({ id = null, content, userId, username, likes = 0, createdAt = new Date().toISOString() }) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.likes = likes;
        this.createdAt = createdAt;
    }

    static fromPayload(payload) {
        const cleanContent = typeof payload.content === 'string' ? payload.content.trim() : '';

        if (!cleanContent) {
            const error = new Error('Post content is required');
            error.statusCode = 400;
            throw error;
        }

        return new Post({
            content: cleanContent,
            userId: payload.userId,
            username: payload.username || payload.userId || 'community_member',
        });
    }

    withId(id) {
        return new Post({
            id,
            content: this.content,
            userId: this.userId,
            username: this.username,
            likes: this.likes,
            createdAt: this.createdAt,
        });
    }

    toFirestore() {
        return {
            content: this.content,
            userId: this.userId,
            username: this.username,
            likes: this.likes,
            createdAt: this.createdAt,
        };
    }

    toJSON() {
        return {
            id: this.id,
            ...this.toFirestore(),
        };
    }
}

module.exports = Post;
