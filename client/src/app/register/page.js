"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createMemberSession, createVisitorSession } from '../../services/session';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      createMemberSession({
        username: formData.username,
        email: formData.email,
      });
      router.push('/feed');
    }, 1000);
  };

  const handleVisitorSignup = () => {
    createVisitorSession(visitorName);
    router.push('/feed');
  };

  return (
    <main className="auth-shell register-shell">
      <section className="auth-intro">
        <p className="eyebrow">Join the community</p>
        <h1>Choose a permanent account or a visitor identity.</h1>
        <p>
          Registered users get a reusable profile. Visitors get a generated ID
          and can still enter the feed with a visible identity.
        </p>
      </section>

      <section className="auth-grid">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="auth-badge">Full account</span>
            <h2>Create account</h2>
            <p>Save your handle, interests, and profile for future visits.</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="stacked-form">
            <label className="form-group">
              <span>Username</span>
              <input
                type="text"
                name="username"
                placeholder="craft_captain"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </label>
            <label className="form-group">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </label>
            <label className="form-group">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </label>
            <label className="form-group">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </label>
            <button type="submit" className="full-width" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            Already joined? <Link href="/login">Login</Link>
          </p>
        </div>

        <aside className="visitor-card">
          <span className="auth-badge">Visitor pass</span>
          <h2>Signup as visitor</h2>
          <p>
            Get an instant visitor ID for this browser and enter the community
            without creating a password.
          </p>
          <label className="form-group">
            <span>Display name (optional)</span>
            <input
              type="text"
              placeholder="Weekend maker"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
          </label>
          <button type="button" className="visitor-button" onClick={handleVisitorSignup}>
            Generate visitor ID
          </button>
          <div className="visitor-preview">
            <strong>Example ID</strong>
            <span>VIS-4K9Q2M</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
