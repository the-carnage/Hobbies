// Uses public environment variable or fallbacks to deployed/local endpoints
const defaultApiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://hobbies-api.onrender.com/api' // Example deployed backend URL
  : 'http://localhost:5001/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || defaultApiUrl;

export const fetchFeed = async () => {
    const res = await fetch(`${API_URL}/posts/feed`);
    return res.json();
};

export const createPost = async (data) => {
    const res = await fetch(`${API_URL}/posts/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
};
