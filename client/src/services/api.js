const API_URL = 'http://localhost:5000/api'\;

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
