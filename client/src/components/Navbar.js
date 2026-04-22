"use client";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;
  
  return (
    <nav className="navbar">
      <a href="/" style={{textDecoration: 'none'}}>
        <div className="logo">🌱 Hobbies</div>
      </a>
      <div className="links">
        <a 
          href="/" 
          style={{
            background: isActive('/') ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: isActive('/') ? 'var(--primary)' : 'var(--text-main)'
          }}
        >
          Home
        </a>
        <a 
          href="/feed"
          style={{
            background: isActive('/feed') ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: isActive('/feed') ? 'var(--primary)' : 'var(--text-main)'
          }}
        >
          Feed
        </a>
        <a 
          href="/profile"
          style={{
            background: isActive('/profile') ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: isActive('/profile') ? 'var(--primary)' : 'var(--text-main)'
          }}
        >
          Profile
        </a>
        <a 
          href="/login"
          style={{
            background: isActive('/login') ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: isActive('/login') ? 'var(--primary)' : 'var(--text-main)'
          }}
        >
          Login
        </a>
      </div>
    </nav>
  );
}
