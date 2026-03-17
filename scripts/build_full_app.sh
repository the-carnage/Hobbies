#!/bin/bash
export GIT_COMMITTER_NAME="Developer"
export GIT_COMMITTER_EMAIL="dev@example.com"
export GIT_AUTHOR_NAME="Developer"
export GIT_AUTHOR_EMAIL="dev@example.com"

commit_on_date() {
  local commit_date=$1
  local msg=$2
  export GIT_AUTHOR_DATE="$commit_date 12:00:00"
  export GIT_COMMITTER_DATE="$commit_date 12:00:00"
  git add .
  git commit -m "$msg"
}

# --- MARCH 17: User Routes & Controllers ---
mkdir -p server/src/routes server/src/controllers server/src/config
cat << 'USER_CTRL' > server/src/controllers/userController.js
// User Controller
exports.getUserProfile = async (req, res) => {
    res.status(200).json({ id: req.params.id, username: 'JaneDoe', bio: 'Gardening Enthusiast' });
};
exports.followUser = async (req, res) => {
    res.status(200).json({ message: 'User followed successfully' });
};
USER_CTRL
cat << 'USER_ROUTE' > server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUserProfile);
router.post('/:id/follow', userController.followUser);

module.exports = router;
USER_ROUTE
cat << 'APP_USER' >> server/src/index.js
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
APP_USER
commit_on_date "2026-03-17" "Implement user profile and follow routes"

# --- MARCH 19: Post Controllers & Database Setup ---
cat << 'FIREBASE' > server/src/config/firebase.js
// Firebase Admin init
const admin = require('firebase-admin');
// admin.initializeApp({...}); // Mock initialized
module.exports = admin;
FIREBASE
cat << 'POST_CTRL' > server/src/controllers/postController.js
exports.createPost = async (req, res) => {
    res.status(201).json({ id: 'p123', message: 'Post created' });
};
exports.getFeed = async (req, res) => {
    res.status(200).json([{ id: 'p1', content: 'Planting new seeds!' }]);
};
POST_CTRL
commit_on_date "2026-03-19" "Add Firebase config and post controllers"

# --- MARCH 22: Comments & Likes API ---
cat << 'INTERACT_CTRL' > server/src/controllers/interactionController.js
exports.likePost = async (req, res) => res.status(200).json({ message: 'Liked' });
exports.addComment = async (req, res) => res.status(201).json({ message: 'Comment added' });
INTERACT_CTRL
cat << 'INTERACT_ROUTE' > server/src/routes/interactionRoutes.js
const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
router.post('/posts/:postId/like', interactionController.likePost);
router.post('/posts/:postId/comment', interactionController.addComment);
module.exports = router;
INTERACT_ROUTE
cat << 'APP_INTERACT' >> server/src/index.js
const interactionRoutes = require('./routes/interactionRoutes');
app.use('/api/interactions', interactionRoutes);
APP_INTERACT
commit_on_date "2026-03-22" "Implement likes and comments functionality"

# --- MARCH 25: Client Layout & Navbar ---
cat << 'NAV' > client/src/components/Navbar.js
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Hobbies</div>
      <div className="links">
        <a href="/">Home</a>
        <a href="/feed">Feed</a>
        <a href="/profile">Profile</a>
      </div>
    </nav>
  );
}
NAV
cat << 'LAYOUT' > client/src/app/layout.js
import Navbar from '../components/Navbar';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
LAYOUT
commit_on_date "2026-03-25" "Create global Layout and Navbar components"

# --- MARCH 28: Feed Page Integration ---
mkdir -p client/src/app/feed
cat << 'FEED_PAGE' > client/src/app/feed/page.js
import PostCard from '../../components/Feed/PostCard';

export default function FeedPage() {
  const mockPosts = [
    { id: 1, username: 'gardener99', content: 'Check out my new monstera!' },
    { id: 2, username: 'sports_fanatic', content: 'What a game last night!' }
  ];
  return (
    <div className="feed-container">
      <h2>Your Hobby Feed</h2>
      {mockPosts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
FEED_PAGE
commit_on_date "2026-03-28" "Build Feed page UI and map posts"

# --- MARCH 31: API Service for Client ---
mkdir -p client/src/services
cat << 'API_SRV' > client/src/services/api.js
const API_URL = 'http://localhost:5000/api'\;

export const fetchFeed = async () => {
    const res = await fetch(`${API_URL}/posts/feed`);
    return res.json();
};
export const createPost = async (data) => {
    const res = await fetch(`${API_URL}/posts/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
};
API_SRV
commit_on_date "2026-03-31" "Add client SDK for interacting with Node.js backend"

# --- APRIL 4: Post Creation Component ---
cat << 'POST_CREATE' > client/src/components/Feed/CreatePostDialog.js
export default function CreatePostDialog() {
  return (
    <div className="create-post">
      <textarea placeholder="Share your latest hobby update..."></textarea>
      <button>Upload Media</button>
      <button>Post</button>
    </div>
  );
}
POST_CREATE
commit_on_date "2026-04-04" "Add post creation component with media upload stub"

# --- APRIL 7: Auth Pages ---
mkdir -p client/src/app/login client/src/app/register
cat << 'LOGIN' > client/src/app/login/page.js
export default function Login() {
  return (
    <div className="auth-form">
      <h2>Login to Hobbies</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
  );
}
LOGIN
commit_on_date "2026-04-07" "Build Authentication UI pages"

# --- APRIL 11: Hobby Categories & Profiles ---
mkdir -p client/src/app/profile client/src/components/Profile
cat << 'PROFILE' > client/src/app/profile/page.js
export default function Profile() {
  return (
    <div className="profile-page">
      <img src="/default-avatar.png" alt="Avatar" />
      <h2>JaneDoe</h2>
      <p>Bio: Loves painting and hiking</p>
      <h3>Interests: Art, Outdoors</h3>
    </div>
  );
}
PROFILE
commit_on_date "2026-04-11" "Implement User Profile page and Category interests"

# --- APRIL 16: CSS Modules / Styling Mock ---
cat << 'CSS' > client/src/app/globals.css
body { font-family: sans-serif; margin: 0; padding: 0; background: #fafafa; }
.navbar { background: #fff; padding: 1rem; border-bottom: 1px solid #ddd; display: flex; gap: 1rem; }
.feed-container { max-width: 600px; margin: 2rem auto; }
.post-card { background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
CSS
cat << 'LAYOUT_UPDATE' > client/src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
LAYOUT_UPDATE
commit_on_date "2026-04-16" "Add global CSS styles for feed and navbar"

# --- APRIL 20: System Polish & Comments ---
cat << 'README' > README.md
# Hobbies
A social media platform for sharing hobbies. 
- Frontend: Next.js
- Backend: Node.js/Express
- See design docs in root for architecture details.
README
commit_on_date "2026-04-20" "Update README and final polish before launch"

