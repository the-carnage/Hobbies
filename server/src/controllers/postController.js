const { db } = require('../config/firebase');

exports.createPost = async (req, res) => {
    try {
        const { content, userId } = req.body;
        
        if (db) {
            const postRef = await db.collection('posts').add({
                content,
                userId,
                createdAt: new Date().toISOString()
            });
            return res.status(201).json({ id: postRef.id, message: 'Post created in Firestore' });
        } else {
            // Fallback for local testing without Firebase Keys
            return res.status(201).json({ id: Date.now(), content, message: 'Mock Post created' });
        }
    } catch (error) {
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
            return res.status(200).json([
                { id: '1', content: 'Planting new seeds! 🌱', username: 'gardener99' },
                { id: '2', content: 'What a game last night! ⚽', username: 'sports_fanatic' }
            ]);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
