const admin = require('firebase-admin');
let db = null;

try {
    // Requires GOOGLE_APPLICATION_CREDENTIALS in env
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
    db = admin.firestore();
    console.log("Firebase connected successfully");
} catch (error) {
    console.warn("Firebase initialization skipped (missing credentials), running in mocked mode.");
}

module.exports = { admin, db };
