export default function Home() {
  return (
    <main className="hero">
      <h1>🌱 Welcome to Hobbies</h1>
      <p>Connect with passionate communities. Share your interests. Discover new hobbies.</p>
      <p style={{color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem'}}>
        Whether it's gardening, sports, arts, or pets — find your tribe and share your passion.
      </p>
      <div className="cta-buttons">
        <a href="/feed" className="btn-primary">Explore Feed</a>
        <a href="/login" className="btn-secondary">Get Started</a>
      </div>
    </main>
  );
}
