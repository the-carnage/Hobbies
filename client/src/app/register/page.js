"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    
    // Simulate registration (replace with real auth)
    setTimeout(() => {
      console.log("Registering user:", formData.email);
      router.push('/feed');
    }, 1000);
  };

  return (
    <div className="auth-form">
      <h2 style={{marginTop: 0}}>🌱 Join Hobbies</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
        Create an account to start sharing your passions
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            name="password"
            placeholder="Password (min 6 characters)" 
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required 
          />
        </div>
        <button type="submit" style={{width: '100%'}} disabled={loading}>
          {loading ? <span className="loading-spinner"></span> : 'Create Account'}
        </button>
      </form>
      
      <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)'}}>
        Already have an account? <a href="/login" style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '600'}}>Login</a>
      </p>
    </div>
  );
}
