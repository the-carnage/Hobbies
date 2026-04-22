# 🚀 Quick Start Guide

## For Your Professor/TA

This is a Next.js + Express.js social media app for hobby enthusiasts.

### Start the App (2 steps)

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```
Server runs on: http://localhost:5001

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```
App runs on: http://localhost:3000

### What to Test

1. **Home Page** (http://localhost:3000)
   - Modern hero section with gradient
   - Click "Explore Feed" button

2. **Feed Page** (http://localhost:3000/feed)
   - See 5 sample posts
   - Click ❤️ to like posts (counter updates)
   - Click 💬 to toggle comments
   - Create a new post (character counter shows)

3. **Login Page** (http://localhost:3000/login)
   - Try submitting empty form (validation works)
   - Enter any email/password and submit
   - Redirects to feed

4. **Register Page** (http://localhost:3000/register)
   - Password confirmation validation
   - All fields required

5. **Profile Page** (http://localhost:3000/profile)
   - Click "Edit Profile" to toggle edit mode
   - See user stats

### Key Features to Notice

✨ **Interactive UI**
- Hover over any card or button
- Like buttons toggle with animation
- Loading spinners on form submissions
- Success/error messages

🎨 **Modern Design**
- Gradient hero section
- Smooth animations
- Sticky navigation
- Responsive layout

🔧 **Error Handling**
- Form validation
- Retry buttons on errors
- Loading states everywhere

### No Firebase Setup Needed!

The app works with mock data by default. Firebase is optional.

### Production Build

```bash
cd client
npm run build
npm start
```

### Questions?

See:
- `README.md` - Full setup guide
- `TESTING.md` - Complete testing checklist
- `IMPROVEMENTS_SUMMARY.md` - All improvements made

---

**Status**: ✅ Ready to grade!
