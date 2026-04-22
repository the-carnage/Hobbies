export default function NotFound() {
  return (
    <div className="hero">
      <h1 style={{fontSize: '6rem', margin: '0'}}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="cta-buttons">
        <a href="/" className="btn-primary">Go Home</a>
        <a href="/feed" className="btn-secondary">View Feed</a>
      </div>
    </div>
  );
}
