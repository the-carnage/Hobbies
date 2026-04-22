"use client";
import { useState } from 'react';
import { createPost } from '../../services/api';

export default function CreatePostDialog({ session, onPostCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePost = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError('Please write something before posting!');
      return;
    }

    if (trimmedContent.length > 500) {
      setError('Posts can be up to 500 characters.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const createdPost = await createPost({
        content: trimmedContent,
        userId: session.id,
        username: session.username,
      });

      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onPostCreated) onPostCreated(createdPost);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="composer-header">
        <span className="avatar small">{session.displayName?.charAt(0)?.toUpperCase() || 'H'}</span>
        <div>
          <h3>Share an update</h3>
          <p>Posting as {session.type === 'visitor' ? session.id : `@${session.username}`}</p>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Post published to the feed.</div>}
      
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
      
      <div className="composer-actions">
        <span className={content.length > 500 ? 'count danger' : 'count'}>
          {content.length}/500
        </span>
        <button
          type="button"
          className="btn-muted"
          disabled={loading}
        >
          Add media
        </button>
        <button
          type="button"
          onClick={handlePost}
          disabled={loading || content.length > 500}
        >
          {loading ? <span className="loading-spinner"></span> : 'Publish post'}
        </button>
      </div>
    </div>
  );
}
