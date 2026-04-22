"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../services/session";

export default function AuthGate({ children }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const current = getSession();

    if (!current) {
      const nextPath = window.location.pathname;
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
      return;
    }

    setSession(current);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <main className="app-page">
        <div className="state-panel">
          <span className="loading-spinner dark"></span>
          <p>Checking your community pass...</p>
        </div>
      </main>
    );
  }

  return children(session);
}
