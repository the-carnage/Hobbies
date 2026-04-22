"use client";
import { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="post-card">
      <h3>@{post.username || 'Anonymous'}</h3>
      <p>{post.content}</p>
      
      <div className="post-actions">
        <button 
          className={`action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {liked ? '❤️' : '🤍'} {likes}
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
        <button className="action-btn">
          🔗 Share
        </button>
      </div>
      
      {showComments && (
        <div style={{marginTop: '1rem', padding: '1rem', background: 'var(--bg)', borderRadius: '8px'}}>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Comments coming soon...</p>
        </div>
      )}
    </div>
  );
}
