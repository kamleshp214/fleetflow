# 🔥 Firebase Setup - Visual Guide

## Current Status

✅ Your app is running!  
❌ Firebase credentials need to be configured

## The Error You're Seeing

```
Firebase: Error (auth/invalid-api-key)
```

This is normal! It just means you need to add your Firebase Admin credentials to `.env.local`.

---

## 🎯 Quick Setup (Follow These Steps)

### Step 1: Open Firebase Console

1. Go to: **https://console.firebase.google.com/**
2. Sign in with your Google account
3. You should see your project: **fleetflow-5c1c7**
4. Click on it to open

### Step 2: Get to Service Accounts

```
Firebase Console
    ↓
Click the ⚙️ (gear icon) in top left
    ↓
Click "Project Settings"
    ↓
Click "Service Accounts" tab
    ↓
You should see "Firebase Admin SDK" section
```

### Step 3: Generate Private Key

1. Look for the button: **"Generate new private key"**
2. Click it
3. A dialog will appear asking for confirmation
4. Click **"Generate key"**
5. A JSON file will download (e.g., `fleetflow-5c1c7-firebase-adminsdk-xxxxx.json`)

### Step 4: Open the Downloaded JSON File

The file will look like this:

```json
{
  "type": "service_account",
  "project_id": "fleetflow-5c1c7",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

### Step 5: Copy the Values

You need TWO values from this JSON:

**1. client_email** (looks like):
```
firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
```

**2. private_key** (looks like):
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
...many lines of random characters...
...more random characters...
-----END PRIVATE KEY-----
```

### Step 6: Update .env.local

I've already created `.env.local` for you! Just open it and replace these two lines:

**Before:**
```env
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_EMAIL_HERE
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY_HERE"
```

**After:**
```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANT:**
- Keep the quotes `"` around the private key
- Keep all the `\n` characters (they represent line breaks)
- Copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### Step 7: Enable Google Sign-In

While you're in Firebase Console:

1. Click **"Authentication"** in the left sidebar
2. If you see "Get started", click it
3. Click the **"Sign-in method"** tab at the top
4. Find **"Google"** in the providers list
5. Click on it
6. Toggle the **"Enable"** switch
7. Click **"Save"**

### Step 8: Restart Your Server

```bash
# In your terminal, press Ctrl+C to stop the server
# Then run:
npm run dev
```

### Step 9: Test It!

1. Go to: **http://localhost:3000/login**
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. Select a role
5. You should see the dashboard! 🎉

---

## 📋 Checklist

- [ ] Opened Firebase Console
- [ ] Navigated to Service Accounts
- [ ] Generated new private key
- [ ] Downloaded JSON file
- [ ] Copied `client_email` from JSON
- [ ] Copied `private_key` from JSON
- [ ] Updated `.env.local` with both values
- [ ] Enabled Google Sign-In in Firebase
- [ ] Restarted dev server
- [ ] Tested login flow

---

## 🎨 What Your .env.local Should Look Like

```env
# Client config (already filled in)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Admin config (you need to fill these in)
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual key here\n-----END PRIVATE KEY-----\n"
```

---

## 🐛 Common Issues

### Issue 1: "Invalid private key"

**Problem:** The private key format is wrong

**Solution:**
- Make sure you kept the quotes around the key
- Don't remove any `\n` characters
- Copy the entire key including BEGIN and END lines
- The key should be one long line with `\n` for line breaks

### Issue 2: "Unauthorized domain"

**Problem:** localhost is not authorized

**Solution:**
- Go to Firebase Console > Authentication > Settings
- Scroll to "Authorized domains"
- Add `localhost` if it's not there

### Issue 3: "User not found" after signing in

**Problem:** You're trying to log in before registering

**Solution:**
- Go to `/register` first
- Complete the registration flow
- Then you can log in

---

## 🔐 Security Notes

✅ `.env.local` is in `.gitignore` - it won't be committed to Git  
✅ Client config (NEXT_PUBLIC_*) is safe for client-side  
✅ Admin config (FIREBASE_*) must stay secret  
❌ Never share your private key  
❌ Never commit `.env.local` to Git  

---

## 🎉 Success!

Once you've completed these steps, your authentication will work perfectly!

You'll have:
- ✅ Beautiful login/register pages
- ✅ Google Sign-In working
- ✅ Role selection for new users
- ✅ Protected dashboard routes
- ✅ Firebase session management

---

## 📚 Next Steps

After setup is complete:

1. **Test the full flow**
   - Register a new user
   - Sign in
   - Access dashboard

2. **Read the docs**
   - `SETUP_INSTRUCTIONS.md` - Detailed setup
   - `QUICK_START.md` - Quick reference
   - `AUTH_SETUP_GUIDE.md` - Complete guide

3. **Start building**
   - Update API routes to use Firestore
   - Customize the UI
   - Add features

---

**You're just one step away from having a fully functional authentication system!** 🚀

Need help? Check `SETUP_INSTRUCTIONS.md` for more details.
