"use client";
import { useEffect, useState } from 'react';
import PostCard from '../../components/Feed/PostCard';
import CreatePostDialog from '../../components/Feed/CreatePostDialog';
import { fetchFeed } from '../../services/api';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      setError('');
      const data = await fetchFeed();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load feed", err);
      setError('Failed to load posts. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="feed-container">
      <h2 style={{marginBottom: '1.5rem'}}>🎨 Your Hobby Feed</h2>
      <CreatePostDialog onPostCreated={loadPosts} />
      
      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={loadPosts} 
            style={{marginLeft: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem'}}
          >
            Retry
          </button>
        </div>
      )}
      
      {loading ? (
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <div className="loading-spinner" style={{width: '40px', height: '40px', borderWidth: '4px', borderTopColor: 'var(--primary)'}}></div>
          <p style={{marginTop: '1rem', color: 'var(--text-muted)'}}>Loading posts...</p>
        </div>
      ) : posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={post.id || index} post={post} />)
      ) : (
        <div style={{textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', borderRadius: '12px'}}>
          <p style={{fontSize: '3rem', margin: '0'}}>📭</p>
          <p style={{color: 'var(--text-muted)'}}>No posts found. Be the first to share your hobby!</p>
        </div>
      )}
    </div>
  );
}
