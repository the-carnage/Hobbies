const { db } = require('../config/firebase');

const mockFeedPosts = [
    {
        id: '1',
        content: 'Just planted some beautiful roses in my garden! 🌹 The weather has been perfect for gardening lately.',
        username: 'gardener99',
        likes: 24
    },
    {
        id: '2',
        content: 'What an incredible game last night! ⚽ That last-minute goal was absolutely stunning!',
        username: 'sports_fanatic',
        likes: 18
    },
    {
        id: '3',
        content: 'Finished my latest watercolor painting today. Art really helps me relax after a long day. 🎨',
        username: 'artlover_jane',
        likes: 32
    },
    {
        id: '4',
        content: 'My cat learned a new trick! 🐱 She can now high-five on command. So proud!',
        username: 'petparent_mike',
        likes: 45
    },
    {
        id: '5',
        content: 'Completed a 10k run this morning! Training for my first marathon. 🏃‍♀️ Any tips from experienced runners?',
        username: 'runner_sarah',
        likes: 15
    }
];

const shouldUseLocalFallback = () => process.env.NODE_ENV !== 'production';

exports.createPost = async (req, res) => {
    try {
        const { content, userId, username } = req.body;
        const cleanContent = typeof content === 'string' ? content.trim() : '';
        const authorName = username || userId || 'community_member';

        if (!cleanContent) {
            return res.status(400).json({ error: 'Post content is required' });
        }

        const payload = {
            content: cleanContent,
            userId,
            username: authorName,
            likes: 0,
            createdAt: new Date().toISOString()
        };

        if (db) {
            const postRef = await db.collection('posts').add(payload);
            return res.status(201).json({ id: postRef.id, ...payload, message: 'Post created in Firestore' });
        } else {
            // Fallback for local testing without Firebase Keys
            return res.status(201).json({
                id: Date.now(),
                ...payload,
                message: 'Mock Post created'
            });
        }
    } catch (error) {
        if (shouldUseLocalFallback()) {
            return res.status(201).json({
                id: Date.now(),
                content: req.body?.content,
                userId: req.body?.userId,
                username: req.body?.username || req.body?.userId || 'community_member',
                likes: 0,
                createdAt: new Date().toISOString(),
                message: 'Mock Post created'
            });
        }

        return res.status(500).json({ error: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        if (db) {
            const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').limit(20).get();
            const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.status(200).json(posts);
        } else {
            // Mock data for testing without Firebase
            return res.status(200).json(mockFeedPosts);
        }
    } catch (error) {
        if (shouldUseLocalFallback()) {
            return res.status(200).json(mockFeedPosts);
        }

        return res.status(500).json({ error: error.message });
    }
};
