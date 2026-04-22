const admin = require('firebase-admin');
require('dotenv').config();

let db = null;

try {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // For production environments (Vercel, Render, etc.) where JSON is an env var string
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        credential = admin.credential.cert(serviceAccount);
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_CLOUD_PROJECT || process.env.FIREBASE_CONFIG) {
        // Fallback for local
        credential = admin.credential.applicationDefault();
    } else {
        throw new Error('Firebase credentials not configured');
    }
    
    admin.initializeApp({ credential });
    db = admin.firestore();
    console.log("Firebase connected successfully");
} catch (error) {
    console.warn("Firebase initialization skipped (missing credentials), running in mocked mode.");
}

module.exports = { admin, db };
