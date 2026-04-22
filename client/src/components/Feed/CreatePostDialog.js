"use client";
import { useState } from 'react';
import { createPost } from '../../services/api';

export default function CreatePostDialog({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await createPost({ content, userId: 'user123' });
      setContent('');
      if (onPostCreated) onPostCreated();
      // alert("Post created successfully!"); // Commented out to prevent blocking alerts
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
