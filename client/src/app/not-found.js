import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="app-page">
      <div className="empty-state">
        <span>404</span>
        <h1>Page not found</h1>
        <p>
          This page does not exist. Head back to the access screen to continue.
        </p>
        <Link href="/" className="btn-primary">
          Go home
        </Link>
      </div>
    </main>
  );
}
