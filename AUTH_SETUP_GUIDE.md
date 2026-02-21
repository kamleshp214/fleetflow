# Firebase Google Authentication Setup Guide

## ✅ What's Been Implemented

Your login and register pages have been completely redesigned with:

1. **Modern Dark Theme UI**
   - Matches your existing FleetFlow design system
   - Gradient backgrounds with animated elements
   - Glassmorphism cards with backdrop blur
   - Smooth animations and transitions
   - Responsive design for all screen sizes

2. **Google Authentication Only**
   - Removed all email/password input fields
   - Single "Continue with Google" button with official Google branding
   - Seamless OAuth flow using Firebase

3. **Smart Registration Flow**
   - New users sign in with Google
   - Redirected to role selection page
   - Choose from 4 roles: Manager, Dispatcher, Safety Officer, Financial Analyst
   - User profile created in Firestore with Google data

4. **Secure Session Management**
   - Firebase ID token verification
   - HTTP-only session cookies
   - Automatic Firestore sync

## 🎨 New Pages Created

### 1. Login Page (`/login`)
- Clean, centered card layout
- Google Sign-In button
- Link to registration
- Security badge
- Error handling

### 2. Register Page (`/register`)
- Role information display
- Google Sign-In button
- Visual role cards showing available positions
- Link to login

### 3. Role Selection Page (`/register/role-selection`)
- Interactive role selection cards
- Visual feedback for selected role
- Feature lists for each role
- Completes registration process

### 4. GoogleSignInButton Component
- Reusable authentication component
- Loading states
- Error handling
- Official Google branding

## 🔧 Environment Variables

Your Firebase config is already set up! Just create a `.env.local` file:

```env
# Firebase Client (Public) - Already configured
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Firebase Admin (Server-side only) - Get from Firebase Console
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

## 📋 Setup Steps

### 1. Get Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fleetflow-5c1c7`
3. Go to Project Settings (gear icon) > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Extract these values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and \n characters)

### 2. Enable Google Sign-In

1. In Firebase Console, go to Authentication
2. Click "Sign-in method" tab
3. Enable "Google" provider
4. Add your domain to authorized domains:
   - `localhost` (for development)
   - Your production domain

### 3. Set Up Firestore

1. Go to Firestore Database in Firebase Console
2. If not created, click "Create database"
3. Choose production mode
4. Select a location close to your users

### 4. Configure Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Other collections - authenticated users only
    match /{collection}/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Install Dependencies & Run

```bash
npm install
npm run dev
```

## 🎯 User Flow

### Registration Flow
1. User clicks "Create one now" on login page
2. Lands on `/register` page
3. Clicks "Continue with Google"
4. Google OAuth popup appears
5. User selects Google account
6. Redirected to `/register/role-selection`
7. User selects their role (Manager, Dispatcher, etc.)
8. Clicks "Complete Registration"
9. Backend creates Firestore user document
10. User automatically logged in
11. Redirected to `/dashboard`

### Login Flow
1. User clicks "Continue with Google" on login page
2. Google OAuth popup appears
3. User selects Google account
4. Backend verifies ID token
5. Checks if user exists in Firestore
6. Creates session cookie
7. Redirected to `/dashboard`

## 🔐 Security Features

1. **No Password Storage**: Google handles authentication
2. **ID Token Verification**: Every request verified server-side
3. **HTTP-Only Cookies**: Session cookies not accessible via JavaScript
4. **Firestore Rules**: Database access controlled by authentication
5. **Environment Variables**: Sensitive keys never exposed to client

## 🎨 Design System

The new auth pages use your existing design tokens:

- **Primary Color**: `#FFC229` (Yellow/Gold)
- **Secondary Color**: `#4A2B5E` (Purple)
- **Background**: `#0a0a0a` to `#1a1a2e` gradient
- **Cards**: `#1E1E24` with 80% opacity and backdrop blur
- **Borders**: White with 10% opacity
- **Text**: White for headings, gray-400 for body
- **Animations**: Fade-in, slide-in, pulse effects

## 🧪 Testing

1. **Test Registration**:
   - Go to `/register`
   - Click "Continue with Google"
   - Select a Google account
   - Choose a role
   - Verify redirect to dashboard

2. **Test Login**:
   - Go to `/login`
   - Click "Continue with Google"
   - Verify redirect to dashboard

3. **Test Error Handling**:
   - Try logging in without registering first
   - Should show "Account not found" error

## 🚀 Next Steps

1. Update remaining API routes to use Firestore (see `FIRESTORE_API_EXAMPLE.md`)
2. Add user profile page to view/edit role
3. Implement role-based access control (RBAC) in dashboard
4. Add logout functionality in dashboard header
5. Consider adding email/password as backup auth method

## 📱 Mobile Responsive

All pages are fully responsive:
- Mobile: Single column layout
- Tablet: Optimized spacing
- Desktop: Full width with max constraints

## 🎭 Animations

- Fade-in on page load
- Slide-in from bottom
- Pulse effects on background elements
- Hover effects on buttons and cards
- Loading spinners during authentication

## 🐛 Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to authorized domains in Firebase Console

### "Account not found"
- User needs to register first
- Check Firestore for user document

### "Private key must be a string"
- Ensure FIREBASE_PRIVATE_KEY includes quotes
- Keep \n characters in the key

### Redirect not working
- Check that `/dashboard` route exists
- Verify session cookie is being set

## 📚 File Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx (New Google Auth UI)
│   ├── register/
│   │   ├── page.tsx (New Google Auth UI)
│   │   └── role-selection/
│   │       └── page.tsx (New role selection)
│   └── api/
│       └── auth/
│           ├── login/route.ts (Updated for Firebase)
│           ├── register/route.ts (Updated for Firebase)
│           └── logout/route.ts (Updated cookie name)
├── components/
│   └── auth/
│       └── GoogleSignInButton.tsx (New component)
└── lib/
    ├── firebase.ts (Updated with measurementId)
    └── firebaseAdmin.ts (Server-side Firebase)
```

## ✨ Features

- ✅ Google OAuth integration
- ✅ Role-based registration
- ✅ Firestore user sync
- ✅ Session management
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Dark theme
- ✅ Animations
- ✅ Security best practices

Your authentication system is now fully modernized with Firebase! 🎉
