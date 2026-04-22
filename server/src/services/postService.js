const Post = require('../models/postModel');

const mockFeedPosts = [
    new Post({
        id: '1',
        content: 'Just planted some beautiful roses in my garden! 🌹 The weather has been perfect for gardening lately.',
        username: 'gardener99',
        likes: 24
    }).toJSON(),
    new Post({
        id: '2',
        content: 'What an incredible game last night! ⚽ That last-minute goal was absolutely stunning!',
        username: 'sports_fanatic',
        likes: 18
    }).toJSON(),
    new Post({
        id: '3',
        content: 'Finished my latest watercolor painting today. Art really helps me relax after a long day. 🎨',
        username: 'artlover_jane',
        likes: 32
    }).toJSON(),
    new Post({
        id: '4',
        content: 'My cat learned a new trick! 🐱 She can now high-five on command. So proud!',
        username: 'petparent_mike',
        likes: 45
    }).toJSON(),
    new Post({
        id: '5',
        content: 'Completed a 10k run this morning! Training for my first marathon. 🏃‍♀️ Any tips from experienced runners?',
        username: 'runner_sarah',
        likes: 15
    }).toJSON(),
];

class PostService {
    constructor(database) {
        this.db = database;
    }

    shouldUseLocalFallback() {
        return process.env.NODE_ENV !== 'production';
    }

    async createPost(payload) {
        const post = Post.fromPayload(payload);

        if (!this.db) {
            return {
                ...post.withId(Date.now()).toJSON(),
                message: 'Mock Post created',
            };
        }

        try {
            const postRef = await this.db.collection('posts').add(post.toFirestore());
            return {
                ...post.withId(postRef.id).toJSON(),
                message: 'Post created in Firestore',
            };
        } catch (error) {
            if (this.shouldUseLocalFallback()) {
                return {
                    ...post.withId(Date.now()).toJSON(),
                    message: 'Mock Post created',
                };
            }

            throw error;
        }
    }

    async getFeed() {
        if (!this.db) {
            return mockFeedPosts;
        }

        try {
            const snapshot = await this.db.collection('posts').orderBy('createdAt', 'desc').limit(20).get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            if (this.shouldUseLocalFallback()) {
                return mockFeedPosts;
            }

            throw error;
        }
    }
}

module.exports = PostService;
