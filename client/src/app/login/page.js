"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    
    // Simulate login (replace with real auth)
    setTimeout(() => {
      if (email && password) {
        console.log("Logging in with:", email);
        router.push('/feed');
      } else {
        setError('Please enter valid credentials');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-form">
      <h2 style={{marginTop: 0}}>👋 Welcome Back</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
        Login to continue sharing your passions
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required 
          />
        </div>
        <button type="submit" style={{width: '100%'}} disabled={loading}>
          {loading ? <span className="loading-spinner"></span> : 'Login to Hobbies'}
        </button>
      </form>
      
      <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)'}}>
        Don't have an account? <a href="/register" style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '600'}}>Sign up</a>
      </p>
    </div>
  );
}
