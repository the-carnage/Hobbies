# Sequence Diagram — Post Creation Flow

## 🎬 Main Flow: User Creates a Post

User -> NextJS Frontend:
    Click "Create Post"

Frontend -> Firebase Auth:
    Verify user token

Frontend -> Express API:
    Send post data

Express API -> AWS S3:
    Upload media file

AWS S3 -> Express API:
    Return file URL

Express API -> Firebase Firestore:
    Save post metadata

Firestore -> Express API:
    Success response

Express API -> Frontend:
    Post created

Frontend -> User:
    Update feed UI
