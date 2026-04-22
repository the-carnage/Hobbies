"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createMemberSession, createVisitorSession } from '../../services/session';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (email && password) {
        createMemberSession({ email, username: email.split('@')[0] });
        router.push(getNextPath());
      } else {
        setError('Please enter valid credentials');
        setLoading(false);
      }
    }, 1000);
  };

  const getNextPath = () => {
    if (typeof window === 'undefined') return '/feed';

    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get('next') || '/feed';
    return nextPath.startsWith('/') ? nextPath : '/feed';
  };

  const handleVisitorSignup = () => {
    createVisitorSession();
    router.push(getNextPath());
  };

  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <p className="eyebrow">Required access</p>
        <h1>Enter with an account or a visitor ID.</h1>
        <p>
          The feed is reserved for identified members and visitors, so every post
          and profile has a real handle attached to it.
        </p>
      </section>

      <section className="auth-card">
        <div className="auth-card-header">
          <span className="auth-badge">Member login</span>
          <h2>Welcome back</h2>
          <p>Use your account details to continue into Hobbies.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="stacked-form">
          <label className="form-group">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </label>
          <label className="form-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </label>
          <button type="submit" className="full-width" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : 'Login to Hobbies'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button type="button" className="visitor-button" onClick={handleVisitorSignup}>
          Get a visitor ID
        </button>

        <p className="auth-switch">
          New here? <Link href="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
