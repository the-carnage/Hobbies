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
