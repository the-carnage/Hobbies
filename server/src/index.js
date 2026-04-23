require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

const userRoutes = require('./routes/userRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const postRoutes = require('./routes/postRoutes');

// Middleware
app.use(cors({ origin: '*' })); // Allow cross-origin requests from frontend
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.send('Hobbies API is running!'));

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
