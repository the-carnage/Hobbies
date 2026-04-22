"use client";
import { useState } from 'react';
import AuthGate from '../../components/AuthGate';
import { updateSession } from '../../services/session';

export default function Profile() {
  return (
    <AuthGate>
      {(session) => <ProfileExperience session={session} />}
    </AuthGate>
  );
}

function ProfileExperience({ session }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(session.bio || '');
  const [interests, setInterests] = useState(session.interests || '');

  const handleSave = () => {
    updateSession({ bio, interests });
    setIsEditing(false);
  };

  const joinedDate = session.createdAt
    ? new Date(session.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : 'Today';

  return (
    <main className="app-page profile-layout">
      <section className="profile-hero">
        <div className="profile-avatar">
          {session.displayName?.charAt(0)?.toUpperCase() || 'H'}
        </div>
        <div>
          <p className="eyebrow">{session.type === 'visitor' ? 'Visitor profile' : 'Member profile'}</p>
          <h1>{session.displayName || session.username}</h1>
          <p>{session.type === 'visitor' ? session.id : `@${session.username}`} - Joined {joinedDate}</p>
        </div>
      </section>

      <section className="profile-content">
        <div className="profile-card">
          <div className="card-heading">
            <h2>About</h2>
            {!isEditing && (
              <button type="button" className="btn-secondary compact" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>

          <div className="profile-section">
            <h3>Bio</h3>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Tell the community what you enjoy making or learning."
              />
            ) : (
              <p>{bio || 'No bio yet.'}</p>
            )}
          </div>

          <div className="profile-section">
            <h3>Interests</h3>
            {isEditing ? (
              <input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Comma-separated interests"
              />
            ) : (
              <p>{interests || 'No interests added yet.'}</p>
            )}
          </div>

          {isEditing && (
            <div className="button-row">
              <button type="button" onClick={handleSave}>
                Save profile
              </button>
              <button type="button" className="btn-muted" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <aside className="profile-card stats-card">
          <h2>Activity</h2>
          <div className="stats-grid">
            <div>
              <strong>{session.type === 'visitor' ? '1' : '12'}</strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>{session.type === 'visitor' ? '0' : '48'}</strong>
              <span>Likes</span>
            </div>
            <div>
              <strong>{session.type === 'visitor' ? 'Guest' : 'Member'}</strong>
              <span>Status</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
