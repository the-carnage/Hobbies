# 🌱 Hobbies — Social Media Platform

Welcome to **Hobbies**, a passion-driven social media platform designed for niche communities, creators, and hobbyists. Connect, share, and explore interests like gardening, sports, arts, and more!

**Live Demo:** [https://hobbies-1-j3kz.onrender.com/](https://hobbies-1-j3kz.onrender.com/) *(Note: The backend is hosted on a free tier and may take ~1 minute to restart/spin up upon first load. Please be patient!)*

## 🚀 Features
- **User Authentication**: Secure login and profile management.
- **Hobby Feeds**: Discover and browse posts related to your passions.
- **Post Creation**: Share updates effortlessly with our sleek UI.
- **Interactive UI**: Modern, responsive, and eye-catching design built with Next.js.
- **Real-time Database**: Powered by Firebase Firestore for robust data handling.

## 🧱 Tech Stack
- **Frontend**: React.js, Next.js (App Router), CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Deployment**: Render (Frontend & Backend)

---

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/the-carnage/Hobbies.git
cd Hobbies
```

### 2. Backend Setup (`/server`)
Navigate to the server directory:
```bash
cd server
npm install
```

**Environment Variables (`server/.env`)**
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5001
# Absolute path to your Firebase Admin SDK service account JSON
# Or use FIREBASE_SERVICE_ACCOUNT variable containing stringified JSON for production
```

Start the backend server:
```bash
npm run dev
# or
node src/index.js
```

### 3. Frontend Setup (`/client`)
Open a new terminal and navigate to the client directory:
```bash
cd client
npm install
```

**Environment Variables (`client/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the frontend application:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` or `http://localhost:3001`.

---

## 🌍 Deployment (Render)

### Frontend & Backend (Render)
1. Use the `client` directory for the Frontend Web Service and `server` for the Backend Web Service.
2. Build commands are `npm install && npm run build` (client) and `npm install` (server).
3. Start commands are `npm run start` (client) and `npm start` (server).
4. Add the appropriate environment variables (`NEXT_PUBLIC_API_URL` for the client, `FIREBASE_SERVICE_ACCOUNT` for the server).

---
## 📄 Design Documents
For architectural insights, please refer to the markdown files located in the root directory:
- `idea.md` - Core concepts and project scope
- `ErDiagram.md` - Database schema and relationships
- `classDiagram.md` - Application data modeling
- `sequenceDiagram.md` - Action flow metrics
- `useCaseDiagram.md` - Actor permission scopes
