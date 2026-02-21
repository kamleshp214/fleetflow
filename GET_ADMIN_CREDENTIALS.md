# 🔑 Get Firebase Admin Credentials - Step by Step

You already have the client configuration! Now you just need the **Admin credentials** for server-side authentication.

## 📋 What You Need

You need TWO values from Firebase Console:
1. **FIREBASE_CLIENT_EMAIL** - The service account email
2. **FIREBASE_PRIVATE_KEY** - The private key for server-side authentication

## 🎯 Step-by-Step Instructions

### Step 1: Open Firebase Console

1. Go to: **https://console.firebase.google.com/**
2. You should see your project: **fleetflow-5c1c7**
3. Click on it to open the project

### Step 2: Navigate to Service Accounts

```
1. Look for the ⚙️ (gear icon) in the top-left corner
2. Click it
3. Click "Project settings" from the dropdown menu
4. You'll see several tabs at the top
5. Click the "Service accounts" tab
```

### Step 3: Generate Private Key

You should now see a page that says "Firebase Admin SDK" at the top.

```
1. Look for a button that says "Generate new private key"
2. Click it
3. A dialog will pop up warning you to keep the key secure
4. Click "Generate key" to confirm
5. A JSON file will automatically download to your computer
   (It will be named something like: fleetflow-5c1c7-firebase-adminsdk-xxxxx-abc123.json)
```

### Step 4: Open the Downloaded JSON File

Open the downloaded JSON file in any text editor (Notepad, VS Code, etc.).

The file will look like this:

```json
{
  "type": "service_account",
  "project_id": "fleetflow-5c1c7",
  "private_key_id": "abc123def456ghi789...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7xYz...\n...lots more characters...\n...more characters...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-abc123%40fleetflow-5c1c7.iam.gserviceaccount.com"
}
```

### Step 5: Copy the Two Values

From the JSON file, you need to copy TWO values:

**1. client_email** (looks like this):
```
firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
```

**2. private_key** (looks like this):
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7xYz...
...many lines of random characters...
...more random characters...
-----END PRIVATE KEY-----
```

### Step 6: Update Your .env.local File

1. Open `.env.local` in your project root
2. Find these two lines:

```env
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_EMAIL_HERE
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY_HERE"
```

3. Replace them with your actual values:

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7xYz...\n-----END PRIVATE KEY-----\n"
```

### ⚠️ IMPORTANT: Private Key Format

When copying the private key:

✅ **DO:**
- Copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep all the `\n` characters (they represent line breaks)
- Put the entire key on ONE line
- Wrap it in double quotes `"`

❌ **DON'T:**
- Remove the `\n` characters
- Split it into multiple lines in the .env.local file
- Remove the BEGIN or END markers
- Forget the quotes

### Step 7: Save and Verify

1. **Save** the `.env.local` file

2. **Verify** your configuration by running:
   ```bash
   node validate-env.js
   ```

3. If all checks pass, you'll see:
   ```
   🎉 All environment variables are configured correctly!
   ```

### Step 8: Restart Your Server

```bash
# Press Ctrl+C to stop the current server
npm run dev
```

### Step 9: Test It!

1. Go to: **http://localhost:3000/login**
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. You should be redirected to the role selection page!

## 📝 Complete .env.local Example

After you're done, your `.env.local` should look like this:

```env
# Firebase Client Configuration (already filled in)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Firebase Admin Configuration (replace with your values)
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...(your actual key)...\n-----END PRIVATE KEY-----\n"
```

## 🎥 Visual Guide

If you prefer a visual guide, here's what you'll see:

### Firebase Console - Service Accounts Page
```
┌─────────────────────────────────────────────────────────┐
│  Firebase Admin SDK                                     │
│                                                         │
│  Your service account credentials allow you to          │
│  authenticate your app with Firebase services.          │
│                                                         │
│  [Generate new private key]  ← Click this button       │
│                                                         │
│  Admin SDK configuration snippet:                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ var admin = require("firebase-admin");          │   │
│  │ var serviceAccount = require("path/to/key.json");│  │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Security Reminder

- ✅ Keep the downloaded JSON file secure
- ✅ Never commit `.env.local` to Git (it's already in .gitignore)
- ✅ Never share your private key
- ❌ Don't upload the JSON file to GitHub or any public place

## ✅ Success Checklist

- [ ] Opened Firebase Console
- [ ] Navigated to Project Settings → Service Accounts
- [ ] Clicked "Generate new private key"
- [ ] Downloaded the JSON file
- [ ] Opened the JSON file
- [ ] Copied `client_email` value
- [ ] Copied `private_key` value (with \n characters)
- [ ] Updated `.env.local` with both values
- [ ] Ran `node validate-env.js` (all checks passed)
- [ ] Restarted dev server
- [ ] Tested Google Sign-In
- [ ] Successfully logged in!

## 🆘 Need Help?

If you get stuck:
- **Error with private key format**: See `🔧_PRIVATE_KEY_FIX.md`
- **General setup help**: See `🔥_FIREBASE_SETUP.md`
- **Quick troubleshooting**: See `🚨_ERROR_GUIDE.md`

---

**You're just 5 minutes away from having a fully working authentication system!** 🚀

Follow these steps and you'll be all set!
