const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hobbies API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const interactionRoutes = require('./routes/interactionRoutes');
app.use('/api/interactions', interactionRoutes);
