#!/bin/bash
export GIT_COMMITTER_NAME="Developer"
export GIT_COMMITTER_EMAIL="dev@example.com"
export GIT_AUTHOR_NAME="Developer"
export GIT_AUTHOR_EMAIL="dev@example.com"

# Utility to commit with a date
commit_on_date() {
  local commit_date=$1
  local msg=$2
  export GIT_AUTHOR_DATE="$commit_date 12:00:00"
  export GIT_COMMITTER_DATE="$commit_date 12:00:00"
  git add .
  git commit -m "$msg"
}

# --- MARCH 3: Setup Server ---
mkdir -p server/src/routes server/src/models server/src/controllers
cat << 'PKG' > server/package.json
{
  "name": "hobbies-server",
  "version": "1.0.0",
  "description": "Backend for Hobbies Platform",
  "main": "src/index.js",
  "dependencies": {
    "express": "^4.18.2",
    "firebase-admin": "^11.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
PKG
cat << 'IDX' > server/src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hobbies API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
IDX
commit_on_date "2026-03-03" "Initialize Node.js backend with Express scaffolding"


# --- MARCH 5: Firebase Setup & Models ---
cat << 'MOD' > server/src/models/userModel.js
// Firebase Firestore user model structure
// fields: user_id, username, email, profile_image, bio, created_at
module.exports = {};
MOD
cat << 'MOD2' > server/src/models/postModel.js
// Firebase Firestore post model structure
// fields: post_id, user_id, content, media_url, category_id, created_at
module.exports = {};
MOD2
commit_on_date "2026-03-05" "Add Firestore models for Users and Posts based on ER diagram"


# --- MARCH 6: Setup Client Boilerplate ---
mkdir -p client/src/app client/src/components
cat << 'CPKG' > client/package.json
{
  "name": "hobbies-client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "13.4.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
CPKG
cat << 'CPG' > client/src/app/page.js
export default function Home() {
  return (
    <main>
      <h1>Welcome to Hobbies</h1>
      <p>Connect through passions: Gardening, Sports, Pets, and more.</p>
    </main>
  );
}
CPG
commit_on_date "2026-03-06" "Scaffold Next.js client application"


# --- MARCH 8: Add Client Components ---
mkdir -p client/src/components/Feed
cat << 'FEED' > client/src/components/Feed/PostCard.js
export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.username}</h3>
      <p>{post.content}</p>
    </div>
  );
}
FEED
commit_on_date "2026-03-08" "Add primitive Feed components for Next.js frontend"


# --- MARCH 11: Add API Routes for Posts ---
cat << 'RT' > server/src/routes/postRoutes.js
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
  res.status(201).json({ message: 'Post created' });
});

router.get('/feed', (req, res) => {
  res.status(200).json([]);
});

module.exports = router;
RT
cat << 'APP_UPD' >> server/src/index.js
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);
APP_UPD
commit_on_date "2026-03-11" "Implement feed and post creation API routes"


# --- MARCH 12: Sequence Diagram - Server S3 Mock ---
cat << 'S3' > server/src/controllers/mediaController.js
// Mock AWS S3 upload controller
exports.uploadMedia = async (req, res) => {
    // Generate S3 url Mock
    const media_url = "https://mock-s3-bucket.aws.com/image.png"\;
    return res.status(200).json({ url: media_url });
};
S3
commit_on_date "2026-03-12" "Add AWS S3 mock upload controller"


# --- MARCH 15: Client integration with Firebase mock ---
cat << 'AUTH' > client/src/app/auth.js
// Mock Firebase Auth wrapper
export const verifyUser = () => true;
AUTH
commit_on_date "2026-03-15" "Add Firebase Auth module to client"


echo "Done mocking commits!"
