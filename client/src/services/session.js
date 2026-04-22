"use client";

const SESSION_KEY = "hobbies.session.v1";
const SESSION_EVENT = "hobbies-session-change";

const hasWindow = () => typeof window !== "undefined";

const randomToken = (length = 5) =>
  Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(2, 2 + length).toUpperCase();

const toHandle = (value, fallback) => {
  const clean = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 22);

  return clean || fallback;
};

const notifySessionChange = () => {
  if (!hasWindow()) return;
  window.dispatchEvent(new Event(SESSION_EVENT));
};

export const getSession = () => {
  if (!hasWindow()) return null;

  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const saveSession = (session) => {
  if (!hasWindow()) return session;

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notifySessionChange();
  return session;
};

export const clearSession = () => {
  if (!hasWindow()) return;

  window.localStorage.removeItem(SESSION_KEY);
  notifySessionChange();
};

export const createVisitorSession = (preferredName = "") => {
  const token = randomToken(6);
  const displayName = preferredName.trim() || `Visitor ${token}`;
  const username = toHandle(displayName, `visitor_${token.toLowerCase()}`);

  return saveSession({
    id: `VIS-${token}`,
    type: "visitor",
    username,
    displayName,
    email: "",
    bio: "Exploring the community with a visitor pass.",
    interests: "Open to new hobbies",
    createdAt: new Date().toISOString(),
  });
};

export const createMemberSession = ({ username, email }) => {
  const fallbackName = email ? email.split("@")[0] : `member_${randomToken(4).toLowerCase()}`;
  const handle = toHandle(username || fallbackName, fallbackName);

  return saveSession({
    id: `USR-${randomToken(8)}`,
    type: "member",
    username: handle,
    displayName: username?.trim() || handle,
    email: email?.trim() || "",
    bio: "Building a home for favorite hobbies.",
    interests: "Art, outdoors, making",
    createdAt: new Date().toISOString(),
  });
};

export const updateSession = (updates) => {
  const current = getSession();
  if (!current) return null;

  return saveSession({
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const sessionChangeEvent = SESSION_EVENT;
