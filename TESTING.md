# Testing Guide for Hobbies App

## Quick Start Testing

### 1. Backend Testing (Server)

```bash
cd server
npm install
npm start
```

The server should start on `http://localhost:5001`

**Test the API endpoints:**

```bash
# Test server is running
curl http://localhost:5001/

# Test feed endpoint
curl http://localhost:5001/api/posts/feed

# Test create post
curl -X POST http://localhost:5001/api/posts/create \
  -H "Content-Type: application/json" \
  -d '{"content":"Testing my first post!","userId":"user123"}'
```

### 2. Frontend Testing (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The app should start on `http://localhost:3000`

## Manual Testing Checklist

### Home Page (/)
- [ ] Hero section displays with gradient title
- [ ] "Explore Feed" and "Get Started" buttons work
- [ ] Navigation bar is sticky and responsive
- [ ] Logo hover animation works

### Login Page (/login)
- [ ] Form validation works (required fields)
- [ ] Loading spinner shows during login
- [ ] Error messages display correctly
- [ ] "Sign up" link navigates to register page
- [ ] Successful login redirects to feed

### Register Page (/register)
- [ ] All form fields are required
- [ ] Password confirmation validation works
- [ ] Password length validation (min 6 chars)
- [ ] Loading state works
- [ ] "Login" link navigates to login page

### Feed Page (/feed)
- [ ] Loading spinner shows while fetching posts
- [ ] Create post dialog works
- [ ] Character counter shows (max 500)
- [ ] Success message appears after posting
- [ ] Error handling works if server is down
- [ ] Retry button works on error
- [ ] Empty state shows when no posts

### Post Interactions
- [ ] Like button toggles (heart icon changes)
- [ ] Like count increments/decrements
- [ ] Comment button shows/hides comment section
- [ ] Share button is clickable
- [ ] Post cards have hover effects

### Profile Page (/profile)
- [ ] Avatar displays correctly
- [ ] Edit mode toggles on/off
- [ ] Bio and interests are editable
- [ ] Stats display correctly
- [ ] Save/Cancel buttons work

### Navigation
- [ ] All nav links work
- [ ] Active page is highlighted
- [ ] Navbar is sticky on scroll
- [ ] Mobile responsive (test at 768px width)

## Browser Testing

Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

## Responsive Testing

Test at these breakpoints:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

## Performance Checks

- [ ] No console errors
- [ ] Images/icons load properly
- [ ] Animations are smooth
- [ ] No layout shifts
- [ ] Fast page transitions

## Known Limitations

- Authentication is simulated (not real Firebase Auth yet)
- Media upload is placeholder only
- Comments are not implemented yet
- User data is hardcoded

## Production Build Test

```bash
cd client
npm run build
npm start
```

Visit `http://localhost:3000` and verify everything works in production mode.

## Submission Checklist

- [ ] All pages load without errors
- [ ] UI is polished and interactive
- [ ] .gitignore excludes unnecessary files
- [ ] README.md is up to date
- [ ] Code is clean and commented
- [ ] No console errors in browser
- [ ] App works in production build
