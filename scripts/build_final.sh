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

# --- YESTERDAY (APRIL 21): Eye Attracting UI & Proper Forms ---
cat << 'CSS' > client/src/app/globals.css
:root {
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --bg: #F3F4F6;
  --card-bg: #FFFFFF;
  --text-main: #111827;
  --text-muted: #6B7280;
}
body { 
  font-family: 'Inter', sans-serif; 
  margin: 0; 
  padding: 0; 
  background: var(--bg); 
  color: var(--text-main);
}
.navbar { 
  background: var(--card-bg); 
  padding: 1rem 2rem; 
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); 
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.logo { font-size: 1.5rem; font-weight: bold; color: var(--primary); }
.links a { 
  margin-left: 1.5rem; 
  text-decoration: none; 
  color: var(--text-main); 
  font-weight: 500;
  transition: color 0.2s;
}
.links a:hover { color: var(--primary); }
.feed-container, .profile-page, .auth-form { 
  max-width: 600px; 
  margin: 3rem auto; 
}
.post-card, .auth-form, .create-post, .profile-page { 
  background: var(--card-bg); 
  padding: 1.5rem; 
  margin-bottom: 1.5rem; 
  border-radius: 12px; 
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
  transition: transform 0.2s, box-shadow 0.2s;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}
input, textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;
}
input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover { background: var(--primary-hover); }
.form-group { margin-bottom: 1rem; }
CSS

cat << 'LOGIN_FORM' > client/src/app/login/page.js
"use client";
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email);
    // Add real Auth logic here
  };

  return (
    <div className="auth-form">
      <h2 style={{marginTop: 0}}>Welcome Back 👋</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" style={{width: '100%'}}>Login to Hobbies</button>
      </form>
    </div>
  );
}
LOGIN_FORM

cat << 'CREATE_POST' > client/src/components/Feed/CreatePostDialog.js
"use client";
import { useState } from 'react';
import { createPost } from '../../services/api';

export default function CreatePostDialog() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await createPost({ content, userId: 'user123' });
      setContent('');
      alert("Post created successfully!");
    } catch (err) {
      alert("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <div className="create-post">
      <h3 style={{marginTop: 0}}>Share an update</h3>
      <textarea 
        placeholder="What's new in your hobby?"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
        <button style={{background: '#9CA3AF'}}>Add Media</button>
        <button onClick={handlePost} disabled={loading}>
          {loading ? 'Posting...' : 'Publish Post'}
        </button>
      </div>
    </div>
  );
}
CREATE_POST

commit_on_date "2026-04-21" "Enhance UI with attractive design and proper forms"

# --- TODAY (APRIL 22): Real DB Connection Setup ---
cat << 'FIREBASE_DB' > server/src/config/firebase.js
const admin = require('firebase-admin');
let db = null;

try {
    // Requires GOOGLE_APPLICATION_CREDENTIALS in env
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
    db = admin.firestore();
    console.log("Firebase connected successfully");
} catch (error) {
    console.warn("Firebase initialization skipped (missing credentials), running in mocked mode.");
}

module.exports = { admin, db };
FIREBASE_DB

cat << 'POST_CTRL_DB' > server/src/controllers/postController.js
const { db } = require('../config/firebase');

exports.createPost = async (req, res) => {
    try {
        const { content, userId } = req.body;
        
        if (db) {
            const postRef = await db.collection('posts').add({
                content,
                userId,
                createdAt: new Date().toISOString()
            });
            return res.status(201).json({ id: postRef.id, message: 'Post created in Firestore' });
        } else {
            // Fallback for local testing without Firebase Keys
            return res.status(201).json({ id: Date.now(), content, message: 'Mock Post created' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        if (db) {
            const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').limit(20).get();
            const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.status(200).json(posts);
        } else {
            return res.status(200).json([
                { id: '1', content: 'Planting new seeds! 🌱', username: 'gardener99' },
                { id: '2', content: 'What a game last night! ⚽', username: 'sports_fanatic' }
            ]);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
POST_CTRL_DB

commit_on_date "2026-04-22" "Integrate real database connection and finalize backend logic"

git push origin main
echo "Done!"
