class InteractionController {
    async likePost(req, res) {
        return res.status(200).json({ postId: req.params.postId, message: 'Liked' });
    }

    async addComment(req, res) {
        return res.status(201).json({ postId: req.params.postId, message: 'Comment added' });
    }
}

const controller = new InteractionController();

module.exports = {
    likePost: controller.likePost.bind(controller),
    addComment: controller.addComment.bind(controller),
};
