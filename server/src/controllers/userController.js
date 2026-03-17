// User Controller
exports.getUserProfile = async (req, res) => {
    res.status(200).json({ id: req.params.id, username: 'JaneDoe', bio: 'Gardening Enthusiast' });
};
exports.followUser = async (req, res) => {
    res.status(200).json({ message: 'User followed successfully' });
};
