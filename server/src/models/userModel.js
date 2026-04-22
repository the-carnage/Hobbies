class User {
    constructor({ id, username, email = '', profileImage = '', bio = '', createdAt = new Date().toISOString() }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profileImage = profileImage;
        this.bio = bio;
        this.createdAt = createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            profileImage: this.profileImage,
            bio: this.bio,
            createdAt: this.createdAt,
        };
    }
}

module.exports = User;
