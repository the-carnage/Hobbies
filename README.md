# 🌱 Hobbies — Social Media Platform

Welcome to **Hobbies**, a passion-driven social media platform designed for niche communities, creators, and hobbyists. Connect, share, and explore interests like gardening, sports, arts, and more!

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
- **Deployment**: Vercel (Frontend), Render / Railway (Backend)

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
PORT=5000
# Absolute path to your Firebase Admin SDK service account JSON
GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/firebase-adminsdk.json"
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
Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend application:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 🌍 Deployment Guide (Hosting Ready)

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Set the Root Directory to `client`.
4. Add the Environment Variable `NEXT_PUBLIC_API_URL` pointing to your hosted backend URL.
5. Deploy!

### Backend (Render / Railway)
1. Connect your GitHub repository to Render or Railway.
2. Set the Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `node src/index.js`
5. Add your `GOOGLE_APPLICATION_CREDENTIALS` logic (Note: For cloud hosting, it is recommended to parse Firebase credentials directly from an environment string instead of a file for easier deployment).

---
## 📄 Design Documents
For architectural insights, please refer to the markdown files located in the root directory:
- `idea.md` - Core concepts and project scope
- `ErDiagram.md` - Database schema and relationships
- `classDiagram.md` - Application data modeling
- `sequenceDiagram.md` - Action flow metrics
- `useCaseDiagram.md` - Actor permission scopes
