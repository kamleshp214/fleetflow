# 🚀 Quick Start - Firebase Authentication

## ⚡ TL;DR

Your login and register pages are now fully redesigned with Google Authentication. Here's what you need to do:

## ⚠️ Important: Middleware Fixed

The middleware has been updated to work with Firebase session cookies. The old JWT auth file has been removed and replaced with proper Firebase authentication.

## 1️⃣ Create `.env.local`

```env
# Copy your Firebase config (already provided)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Get these from Firebase Console > Project Settings > Service Accounts
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

## 2️⃣ Get Admin Credentials

1. Go to https://console.firebase.google.com/
2. Select project: `fleetflow-5c1c7`
3. Settings (⚙️) > Service Accounts
4. Click "Generate new private key"
5. Copy values to `.env.local`

## 3️⃣ Enable Google Sign-In

1. Firebase Console > Authentication
2. Sign-in method tab
3. Enable "Google"
4. Add `localhost` to authorized domains

## 4️⃣ Run the App

```bash
npm install
npm run dev
```

Visit http://localhost:3000/login

## ✨ What's New

### Login Page (`/login`)
- Modern dark theme matching your dashboard
- Single "Continue with Google" button
- No more email/password fields
- Animated background effects

### Register Page (`/register`)
- Shows available roles with descriptions
- Google Sign-In integration
- Role selection after authentication

### Role Selection (`/register/role-selection`)
- Interactive role cards
- 4 roles: Manager, Dispatcher, Safety Officer, Financial Analyst
- Visual feedback and animations

## 🎯 User Journey

**New User:**
1. Visit `/register`
2. Click "Continue with Google"
3. Select Google account
4. Choose role
5. → Dashboard

**Existing User:**
1. Visit `/login`
2. Click "Continue with Google"
3. → Dashboard

## 🎨 Design Highlights

- **Colors**: `#FFC229` (primary), `#4A2B5E` (secondary)
- **Theme**: Dark with glassmorphism
- **Animations**: Smooth fade-in, slide-in effects
- **Responsive**: Mobile, tablet, desktop optimized

## 📁 New Files

```
✅ src/app/login/page.tsx (redesigned)
✅ src/app/register/page.tsx (redesigned)
✅ src/app/register/role-selection/page.tsx (new)
✅ src/components/auth/GoogleSignInButton.tsx (new)
✅ src/lib/firebase.ts (updated)
```

## 🔐 Security

- ✅ No passwords stored
- ✅ Google OAuth 2.0
- ✅ Firebase ID token verification
- ✅ HTTP-only session cookies
- ✅ Firestore security rules

## 🐛 Common Issues

**"Unauthorized domain"**
→ Add domain to Firebase Console > Authentication > Settings

**"Account not found"**
→ User needs to register first

**"Private key error"**
→ Keep quotes and \n in FIREBASE_PRIVATE_KEY

## 📚 Full Documentation

- `AUTH_SETUP_GUIDE.md` - Complete setup instructions
- `FIREBASE_MIGRATION.md` - Migration details
- `FIRESTORE_API_EXAMPLE.md` - API route examples

## 🎉 You're Ready!

Your authentication is now powered by Firebase with a beautiful, modern UI that matches your FleetFlow design system.

Test it out:
1. Go to `/register`
2. Sign in with Google
3. Select a role
4. Start managing your fleet!
