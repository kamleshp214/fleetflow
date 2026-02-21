# ⚡ Quick Fix - Private Key Error

## What's Happening

You're seeing this error:
```
Error: Failed to parse private key: Error: Invalid PEM formatted message.
```

This means you need to add your Firebase Admin credentials to `.env.local`.

---

## 🎯 3-Step Fix (5 Minutes)

### Step 1: Download Firebase Credentials

1. Go to: https://console.firebase.google.com/
2. Select project: **fleetflow-5c1c7**
3. Click ⚙️ (gear icon) → **Project Settings**
4. Click **Service Accounts** tab
5. Click **"Generate new private key"** button
6. Click **"Generate key"** to confirm
7. A JSON file downloads (e.g., `fleetflow-5c1c7-firebase-adminsdk-xxxxx.json`)

### Step 2: Open the JSON File

Open the downloaded file in any text editor. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "fleetflow-5c1c7",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com",
  ...
}
```

### Step 3: Update .env.local

Open `.env.local` in your project and replace these two lines:

**Find these lines:**
```env
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_EMAIL_HERE
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY_HERE"
```

**Replace with your values from the JSON:**
```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

**IMPORTANT:**
- Copy the ENTIRE `private_key` value from the JSON (including `-----BEGIN` and `-----END`)
- Keep the double quotes `"` around the key
- Keep all the `\n` characters (don't remove them!)
- It should be ONE long line

---

## ✅ Verify Your Setup

Run this command to check if your `.env.local` is correct:

```bash
node validate-env.js
```

This will tell you exactly what's wrong (if anything).

---

## 🔄 Restart and Test

1. **Save** `.env.local`
2. **Stop** the dev server (Ctrl+C)
3. **Restart**: `npm run dev`
4. **Visit**: http://localhost:3000/login
5. **Click**: "Continue with Google"

---

## 🐛 Still Getting the Error?

### Check 1: Is the key on ONE line?

❌ **WRONG** (multiple lines):
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBg...
-----END PRIVATE KEY-----"
```

✅ **CORRECT** (one line with \n):
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

### Check 2: Did you keep the \n characters?

❌ **WRONG** (removed \n):
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvQIBADANBg-----END PRIVATE KEY-----"
```

✅ **CORRECT** (kept \n):
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

### Check 3: Did you include BEGIN and END?

❌ **WRONG** (missing BEGIN/END):
```env
FIREBASE_PRIVATE_KEY="MIIEvQIBADANBg..."
```

✅ **CORRECT** (includes BEGIN/END):
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

---

## 📋 Complete Example

Your `.env.local` should look like this:

```env
# Client config (already filled in)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBA6SsFgbL-fZ1YxF-Hr-U7qQwmeNOAAdI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fleetflow-5c1c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fleetflow-5c1c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fleetflow-5c1c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=634515604935
NEXT_PUBLIC_FIREBASE_APP_ID=1:634515604935:web:53911fa983037d424205e2
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BPG5RGMPC0

# Admin config (replace with your values)
FIREBASE_PROJECT_ID=fleetflow-5c1c7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...(your actual key)...\n-----END PRIVATE KEY-----\n"
```

---

## 🎉 Success!

Once you've updated `.env.local` correctly:

1. ✅ No more "Failed to parse private key" error
2. ✅ Login page loads
3. ✅ Google Sign-In works
4. ✅ You can register and access the dashboard

---

## 📚 Need More Help?

- **Detailed guide**: `🔧_PRIVATE_KEY_FIX.md`
- **Visual setup**: `🔥_FIREBASE_SETUP.md`
- **Full instructions**: `SETUP_INSTRUCTIONS.md`

---

**Just copy the values from the JSON file to `.env.local` and you're done!** 🚀
