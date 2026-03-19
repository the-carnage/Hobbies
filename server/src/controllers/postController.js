exports.createPost = async (req, res) => {
    res.status(201).json({ id: 'p123', message: 'Post created' });
};
exports.getFeed = async (req, res) => {
    res.status(200).json([{ id: 'p1', content: 'Planting new seeds!' }]);
};
