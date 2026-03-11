const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
  res.status(201).json({ message: 'Post created' });
});

router.get('/feed', (req, res) => {
  res.status(200).json([]);
});

module.exports = router;
