"use client";
import { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const author = post.username || 'community_member';
  const authorInitial = author.charAt(0).toUpperCase();

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
      <div className="post-header">
        <span className="avatar small">{authorInitial}</span>
        <div>
          <h3>@{author}</h3>
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}</span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>
      
      <div className="post-actions">
        <button 
          className={`action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span aria-hidden="true">{liked ? 'Liked' : 'Like'}</span>
          {likes}
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          Comment
        </button>
        <button className="action-btn">
          Share
        </button>
      </div>
      
      {showComments && (
        <div className="comment-preview">
          <p>Comments are coming soon.</p>
        </div>
      )}
    </div>
  );
}
