// Mock AWS S3 upload controller
exports.uploadMedia = async (req, res) => {
    // Generate S3 url Mock
    const media_url = "https://mock-s3-bucket.aws.com/image.png"\;
    return res.status(200).json({ url: media_url });
};
