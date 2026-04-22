"use client";
import { useState } from 'react';
import { createPost } from '../../services/api';

export default function CreatePostDialog({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      setError('Please write something before posting!');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await createPost({ content, userId: 'user123' });
      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h3 style={{marginTop: 0}}>✨ Share an update</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Post created successfully! 🎉</div>}
      
      <textarea 
        placeholder="What's new in your hobby? Share your passion..."
        rows={4}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError('');
        }}
        disabled={loading}
      ></textarea>
      
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center'}}>
        <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
          {content.length}/500
        </span>
        <button 
          style={{background: '#9CA3AF'}} 
          disabled={loading}
        >
          📷 Add Media
        </button>
        <button 
          onClick={handlePost} 
          disabled={loading || content.length > 500}
        >
          {loading ? <span className="loading-spinner"></span> : '🚀 Publish Post'}
        </button>
      </div>
    </div>
  );
}
