"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createVisitorSession, getSession } from '../services/session';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleVisitorSignup = () => {
    createVisitorSession();
    router.push('/feed');
  };

  return (
    <main className="home-shell">
      <section className="entry-hero">
        <div className="hero-copy">
          <p className="eyebrow">Community access starts here</p>
          <h1>Share what you make, grow, play, collect, and learn.</h1>
          <p className="hero-lede">
            Hobbies gives every member a clear identity before they enter the feed:
            create an account or start with an instant visitor ID.
          </p>

          <div className="hero-actions">
            {session ? (
              <Link href="/feed" className="btn-primary">
                Continue as {session.type === 'visitor' ? session.id : `@${session.username}`}
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn-primary">
                  Create account
                </Link>
                <button type="button" className="btn-secondary" onClick={handleVisitorSignup}>
                  Get visitor ID
                </button>
              </>
            )}
          </div>

          <div className="access-row" aria-label="Access options">
            <span>Member profiles</span>
            <span>Visitor IDs</span>
            <span>Protected feed</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80"
            alt="A tabletop with creative tools, plants, and hobby materials"
          />
          <div className="floating-note note-one">
            <strong>VIS-READY</strong>
            <span>Instant guest identity</span>
          </div>
          <div className="floating-note note-two">
            <strong>32</strong>
            <span>fresh hobby posts today</span>
          </div>
        </div>
      </section>

      <section className="feature-grid" aria-label="Hobbies highlights">
        <article>
          <span className="feature-kicker">Identity</span>
          <h2>No anonymous browsing</h2>
          <p>Visitors receive a visible ID before joining conversations, while registered members keep a profile.</p>
        </article>
        <article>
          <span className="feature-kicker">Feed</span>
          <h2>Built around making</h2>
          <p>Posts, prompts, and profiles are arranged around practical hobby updates instead of noisy scrolling.</p>
        </article>
        <article>
          <span className="feature-kicker">Profiles</span>
          <h2>Simple personal space</h2>
          <p>Members and visitors can carry a bio, interests, and a clear handle through the app.</p>
        </article>
      </section>
    </main>
  );
}
