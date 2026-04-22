const UserService = require('../services/userService');

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUserProfile = this.getUserProfile.bind(this);
        this.followUser = this.followUser.bind(this);
    }

    async getUserProfile(req, res) {
        return res.status(200).json(this.userService.getUserProfile(req.params.id));
    }

    async followUser(req, res) {
        return res.status(200).json(this.userService.followUser(req.params.id));
    }
}

module.exports = new UserController(new UserService());
