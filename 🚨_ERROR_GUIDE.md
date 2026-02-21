# 🚨 Error Guide - "Unexpected token '<'"

## What This Error Means

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This error means:
1. You clicked "Continue with Google" ✅
2. Google Sign-In worked ✅
3. The app tried to call `/api/auth/login` ✅
4. But the API returned an HTML error page instead of JSON ❌

## Why This Happens

The API route is crashing because the **Firebase Admin credentials** in `.env.local` are not set up correctly.

## 🎯 The Fix

You need to properly configure your Firebase Admin credentials. Here's the exact process:

### Step 1: Get Firebase Service Account Key

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `fleetflow-5c1c7`
3. **Click the gear icon** (⚙️) in the top left
4. **Click "Project Settings"**
5. **Click the "Service Accounts" tab**
6. **Click "Generate new private key"**
7. **Click "Generate key"** in the confirmation dialog
8. **A JSON file will download** (save it somewhere safe)

### Step 2: Open the JSON File

The file will look like this:

```json
{
  "type": "service_account",
  "project_id": "fleetflow-5c1c7",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com",
  "client_id": "123456789...",
  ...
}
```

### Step 3: Update .env.local

Open `.env.local` in your project root and find these lines:

```env
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_EMAIL_HERE
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY_HERE"
```

Replace them with the values from your JSON file:

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

### ⚠️ CRITICAL: Private Key Format

The private key MUST be formatted correctly:

✅ **CORRECT FORMAT:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

- Wrapped in double quotes `"`
- On ONE line (not multiple lines)
- Includes all `\n` characters
- Includes `-----BEGIN PRIVATE KEY-----` at the start
- Includes `-----END PRIVATE KEY-----` at the end

❌ **WRONG FORMATS:**

```env
# Missing quotes
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...

# Multiple lines (wrong!)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBg...
-----END PRIVATE KEY-----"

# Missing \n characters
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvQIBADANBg-----END PRIVATE KEY-----"

# Missing BEGIN/END
FIREBASE_PRIVATE_KEY="MIIEvQIBADANBg..."
```

### Step 4: Verify Your Configuration

Run this command to check if everything is correct:

```bash
node validate-env.js
```

This will tell you exactly what's wrong (if anything).

### Step 5: Restart the Server

```bash
# Press Ctrl+C to stop the server
npm run dev
```

### Step 6: Test Again

1. Go to http://localhost:3000/login
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should now be redirected to the role selection page (for new users) or dashboard (for existing users)

## 🔍 How to Know It's Fixed

When the credentials are correct:
- ✅ No "Unexpected token '<'" error
- ✅ No "Failed to parse private key" error in terminal
- ✅ Google Sign-In completes successfully
- ✅ You're redirected to the next page

## 🐛 Still Getting Errors?

### Error: "Failed to parse private key"

This means the private key format is wrong. See `🔧_PRIVATE_KEY_FIX.md` for detailed formatting instructions.

### Error: "Invalid API key"

This means the client Firebase config is wrong. Check that all `NEXT_PUBLIC_FIREBASE_*` variables are set correctly in `.env.local`.

### Error: "User not found"

This is actually good! It means:
- ✅ Firebase Admin is working
- ✅ Google Sign-In is working
- ❌ You just need to register first

Go to `/register` instead of `/login` to create your account.

## 📋 Complete .env.local Example

Your `.env.local` should look like this:

```env
# Firebase Client Configuration (already filled in)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Firebase Admin Configuration (you need to fill these in)
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...(your actual key)...\n-----END PRIVATE KEY-----\n"
```

## 🆘 Quick Help

**If you're stuck:**

1. **Read**: `⚡_QUICK_FIX.md` - Quickest solution
2. **Read**: `🔧_PRIVATE_KEY_FIX.md` - Private key formatting
3. **Read**: `🔥_FIREBASE_SETUP.md` - Visual step-by-step guide
4. **Run**: `node validate-env.js` - Check your configuration

## ✅ Success Checklist

- [ ] Downloaded Firebase service account JSON
- [ ] Copied `client_email` to `.env.local`
- [ ] Copied `private_key` to `.env.local` (with correct format)
- [ ] Ran `node validate-env.js` (all checks passed)
- [ ] Restarted dev server
- [ ] Tested Google Sign-In
- [ ] No more errors!

---

**The error will go away once you add the correct Firebase Admin credentials to `.env.local`!** 🚀

See `⚡_QUICK_FIX.md` for the fastest solution.
