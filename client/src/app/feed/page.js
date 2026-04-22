"use client";
import { useEffect, useState } from 'react';
import AuthGate from '../../components/AuthGate';
import PostCard from '../../components/Feed/PostCard';
import CreatePostDialog from '../../components/Feed/CreatePostDialog';
import { fetchFeed } from '../../services/api';

export default function FeedPage() {
  return (
    <AuthGate>
      {(session) => <FeedExperience session={session} />}
    </AuthGate>
  );
}

function FeedExperience({ session }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      setError('');
      const data = await fetchFeed();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load feed", err);
      setError('Failed to load posts. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (post) => {
    if (!post?.content) return;

    setPosts((currentPosts) => [
      {
        likes: 0,
        username: session.username,
        ...post,
      },
      ...currentPosts,
    ]);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="app-page feed-layout">
      <aside className="feed-sidebar">
        <div className="identity-panel">
          <span className="avatar">{session.displayName?.charAt(0)?.toUpperCase() || 'H'}</span>
          <div>
            <p className="panel-label">{session.type === 'visitor' ? 'Visitor pass' : 'Member account'}</p>
            <h2>{session.type === 'visitor' ? session.id : `@${session.username}`}</h2>
          </div>
        </div>

        <div className="sidebar-block">
          <h3>Today&apos;s circles</h3>
          <ul className="tag-list">
            <li>Urban gardening</li>
            <li>Watercolor study</li>
            <li>Weekend running</li>
            <li>Home workshop</li>
          </ul>
        </div>

        <div className="sidebar-block warm">
          <h3>Prompt</h3>
          <p>What hobby habit helped you improve this week?</p>
        </div>
      </aside>

      <section className="feed-main">
        <header className="section-header">
          <div>
            <p className="eyebrow">Protected community feed</p>
            <h1>Your hobby feed</h1>
            <p>Share progress, ask for ideas, and discover what other makers are practicing.</p>
          </div>
          <button type="button" className="btn-secondary compact" onClick={loadPosts}>
            Refresh
          </button>
        </header>

        <CreatePostDialog session={session} onPostCreated={handlePostCreated} />

        {error && (
          <div className="error-message inline-action">
            <span>{error}</span>
            <button type="button" onClick={loadPosts}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="state-panel">
            <span className="loading-spinner dark large"></span>
            <p>Loading the latest hobby posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="feed-list">
            {posts.map((post, index) => <PostCard key={post.id || index} post={post} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span>No posts yet</span>
            <h2>Start the first conversation.</h2>
            <p>Share a small win, a project photo idea, or a question for the community.</p>
          </div>
        )}
      </section>
    </main>
  );
}
