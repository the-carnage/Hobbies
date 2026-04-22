class MediaController {
    async uploadMedia(req, res) {
        const mediaUrl = 'https://mock-s3-bucket.aws.com/image.png';
        return res.status(200).json({ url: mediaUrl });
    }
}

const controller = new MediaController();

module.exports = {
    uploadMedia: controller.uploadMedia.bind(controller),
};
