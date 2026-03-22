exports.likePost = async (req, res) => res.status(200).json({ message: 'Liked' });
exports.addComment = async (req, res) => res.status(201).json({ message: 'Comment added' });
