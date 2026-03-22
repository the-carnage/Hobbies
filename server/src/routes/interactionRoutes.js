const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
router.post('/posts/:postId/like', interactionController.likePost);
router.post('/posts/:postId/comment', interactionController.addComment);
module.exports = router;
