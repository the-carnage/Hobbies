const admin = require('firebase-admin');
require('dotenv').config();

let db = null;

try {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // For production environments (Vercel, Render, etc.) where JSON is an env var string
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        credential = admin.credential.cert(serviceAccount);
    } else {
        // Fallback for local
        credential = admin.credential.applicationDefault();
    }
    
    admin.initializeApp({ credential });
    db = admin.firestore();
    console.log("Firebase connected successfully");
} catch (error) {
    console.warn("Firebase initialization skipped (missing credentials), running in mocked mode.");
}

module.exports = { admin, db };
