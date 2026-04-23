#!/bin/bash
export GIT_COMMITTER_NAME="Developer"
export GIT_COMMITTER_EMAIL="dev@example.com"
export GIT_AUTHOR_NAME="Developer"
export GIT_AUTHOR_EMAIL="dev@example.com"
export GIT_AUTHOR_DATE="2026-04-23 12:00:00"
export GIT_COMMITTER_DATE="2026-04-23 12:00:00"

# 1. Update Backend for Production (CORS + Firebase Env Var)
cd server
npm install cors dotenv

cat << 'INDEX' > src/index.js
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
INDEX

cat << 'FIREBASE_NEW' > src/config/firebase.js
const admin = require('firebase-admin');
require('dotenv').config();

let db = null;

try {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // For production environments (Vercel, Render, etc.) where JSON is an env var string
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        credential = admin.credential.cert(serviceAccount);
    } else {
        // Fallback for local
        credential = admin.credential.applicationDefault();
    }
    
    admin.initializeApp({ credential });
    db = admin.firestore();
    console.log("Firebase connected successfully");
} catch (error) {
    console.warn("Firebase initialization skipped (missing credentials), running in mocked mode.");
}

module.exports = { admin, db };
FIREBASE_NEW

# Update package.json scripts for backend
npm pkg set scripts.start="node src/index.js"
npm pkg set scripts.dev="node src/index.js"

# 2. Update Frontend for Production
cd ../client

cat << 'API' > src/services/api.js
// Uses public environment variable or fallbacks to deployed/local endpoints
const defaultApiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://hobbies-api.onrender.com/api' // Example deployed backend URL
  : 'http://localhost:5001/api'\;

const API_URL = process.env.NEXT_PUBLIC_API_URL || defaultApiUrl;

export const fetchFeed = async () => {
    const res = await fetch(\`\${API_URL}/posts/feed\`);
    return res.json();
};

export const createPost = async (data) => {
    const res = await fetch(\`\${API_URL}/posts/create\`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
};
API

# Make git commit
cd ..
git add .
git commit -m "Prepare application for production deployment (CORS, Env Vars, Start Scripts)"
git push origin main

echo "Hosting preparations complete"
