"use client";
import { useEffect, useState } from 'react';
import PostCard from '../../components/Feed/PostCard';
import CreatePostDialog from '../../components/Feed/CreatePostDialog';
import { fetchFeed } from '../../services/api';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const data = await fetchFeed();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="feed-container">
      <h2>Your Hobby Feed</h2>
      <CreatePostDialog onPostCreated={loadPosts} />
      
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id || post.username} post={post} />)
      ) : (
        <p>No posts found. Start sharing your hobby!</p>
      )}
    </div>
  );
}
