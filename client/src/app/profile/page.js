"use client";
import { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Loves painting and hiking');
  const [interests, setInterests] = useState('Art, Outdoors');

  return (
    <div className="profile-page">
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: 'white'
        }}>
          👤
        </div>
        <h2 style={{margin: '0.5rem 0'}}>@JaneDoe</h2>
        <p style={{color: 'var(--text-muted)', margin: '0'}}>Member since 2024</p>
      </div>
      
      <div style={{marginBottom: '1.5rem'}}>
        <h3 style={{marginTop: 0, color: 'var(--primary)'}}>Bio</h3>
        {isEditing ? (
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
        ) : (
          <p style={{color: 'var(--text-main)'}}>{bio}</p>
        )}
      </div>
      
      <div style={{marginBottom: '1.5rem'}}>
        <h3 style={{marginTop: 0, color: 'var(--primary)'}}>Interests</h3>
        {isEditing ? (
          <input 
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Comma-separated interests"
          />
        ) : (
          <p style={{color: 'var(--text-main)'}}>{interests}</p>
        )}
      </div>
      
      <div style={{display: 'flex', gap: '1rem'}}>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          style={{flex: 1}}
        >
          {isEditing ? '💾 Save Profile' : '✏️ Edit Profile'}
        </button>
        {isEditing && (
          <button 
            onClick={() => setIsEditing(false)}
            style={{flex: 1, background: 'var(--text-muted)'}}
          >
            Cancel
          </button>
        )}
      </div>
      
      <div style={{marginTop: '2rem', padding: '1rem', background: 'var(--bg)', borderRadius: '8px'}}>
        <h3 style={{marginTop: 0, fontSize: '1rem'}}>📊 Stats</h3>
        <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
          <div>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0', color: 'var(--primary)'}}>12</p>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0'}}>Posts</p>
          </div>
          <div>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0', color: 'var(--primary)'}}>48</p>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0'}}>Likes</p>
          </div>
          <div>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0', color: 'var(--primary)'}}>23</p>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0'}}>Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
