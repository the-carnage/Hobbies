const User = require('../models/userModel');

class UserService {
    getUserProfile(userId) {
        return new User({
            id: userId,
            username: 'JaneDoe',
            bio: 'Gardening Enthusiast',
        }).toJSON();
    }

    followUser(userId) {
        return {
            userId,
            message: 'User followed successfully',
        };
    }
}

module.exports = UserService;
