"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearSession, getSession, sessionChangeEvent } from '../services/session';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  
  const isActive = (path) => pathname === path;

  useEffect(() => {
    const syncSession = () => setSession(getSession());

    syncSession();
    window.addEventListener('storage', syncSession);
    window.addEventListener(sessionChangeEvent, syncSession);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener(sessionChangeEvent, syncSession);
    };
  }, []);

  const handleSignOut = () => {
    clearSession();
    window.location.href = '/';
  };
  
  return (
    <nav className="navbar">
      <Link href="/" className="brand-link">
        <span className="brand-mark">H</span>
        <span className="logo">Hobbies</span>
      </Link>
      <div className="links">
        <Link href="/" className={isActive('/') ? 'active' : ''}>
          Home
        </Link>

        {session ? (
          <>
            <Link href="/feed" className={isActive('/feed') ? 'active' : ''}>
              Feed
            </Link>
            <Link href="/profile" className={isActive('/profile') ? 'active' : ''}>
              Profile
            </Link>
            <span className="session-chip">{session.type === 'visitor' ? session.id : `@${session.username}`}</span>
            <button type="button" className="nav-button" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={isActive('/login') ? 'active' : ''}>
              Login
            </Link>
            <Link href="/register" className="nav-cta">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
