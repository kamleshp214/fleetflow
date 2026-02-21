# 🚀 Setup Instructions - Get Your App Running

## ✅ Good News!

Your app is running! The error you're seeing is just because the Firebase environment variables aren't set up yet.

## 🔥 Quick Fix (2 Minutes)

### Step 1: Get Firebase Admin Credentials

1. **Open Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `fleetflow-5c1c7`
3. **Go to Project Settings**:
   - Click the gear icon (⚙️) in the top left
   - Click "Project Settings"
4. **Navigate to Service Accounts**:
   - Click the "Service Accounts" tab
5. **Generate Private Key**:
   - Click the "Generate new private key" button
   - Click "Generate key" in the confirmation dialog
   - A JSON file will download to your computer

### Step 2: Update .env.local File

I've created a `.env.local` file for you with the client configuration already filled in. You just need to add the admin credentials:

1. **Open the downloaded JSON file** from Step 1
2. **Find these values** in the JSON:
   ```json
   {
     "client_email": "firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYour key here\n-----END PRIVATE KEY-----\n"
   }
   ```
3. **Open `.env.local`** in your project root
4. **Replace these lines**:
   ```env
   FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_EMAIL_HERE
   FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY_HERE"
   ```
   
   With your actual values:
   ```env
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual key\n-----END PRIVATE KEY-----\n"
   ```

   **Important**: Keep the quotes around the private key and don't remove the `\n` characters!

5. **Save the file**

### Step 3: Enable Google Sign-In

1. **In Firebase Console**, go to **Authentication**
2. Click **"Get started"** if you haven't set up authentication yet
3. Click the **"Sign-in method"** tab
4. Find **"Google"** in the list
5. Click on it and toggle **"Enable"**
6. Click **"Save"**

### Step 4: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🎉 That's It!

Your app should now work! Visit http://localhost:3000/login and try signing in with Google.

## 📋 What You Should See

1. **Login page** with a beautiful dark theme
2. **"Continue with Google" button**
3. Click it → Google sign-in popup
4. After signing in → Role selection page
5. Choose your role → Dashboard

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- ✅ **Fixed!** This was because `.env.local` wasn't set up. Follow the steps above.

### Error: "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings
- Add `localhost` to authorized domains

### Error: "User not found" when logging in
- This means you need to register first
- Go to `/register` instead of `/login`
- Complete the registration flow

### Private key error
- Make sure you kept the quotes around `FIREBASE_PRIVATE_KEY`
- Don't remove the `\n` characters in the key
- The key should look like: `"-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n"`

## 📁 File Structure

Your `.env.local` file should be in the project root:
```
fleet_flow-main/
├── .env.local          ← Your environment variables (created)
├── .env.example        ← Template with your Firebase config
├── src/
├── package.json
└── ...
```

## 🔐 Security Note

- ✅ `.env.local` is already in `.gitignore`
- ✅ Never commit this file to Git
- ✅ The client config (NEXT_PUBLIC_*) is safe to expose
- ✅ The admin config (FIREBASE_*) must stay secret

## 📚 Next Steps

Once your app is running:

1. **Test the authentication flow**
   - Register a new user
   - Sign in with Google
   - Select a role
   - Access the dashboard

2. **Explore the documentation**
   - `QUICK_START.md` - Quick reference
   - `AUTH_SETUP_GUIDE.md` - Complete guide
   - `IMPLEMENTATION_CHECKLIST.md` - Full checklist

3. **Customize your app**
   - Update API routes to use Firestore
   - Add more features
   - Deploy to production

## 🆘 Need Help?

Check these files:
- `🔧_MIDDLEWARE_FIX.md` - Middleware/proxy setup
- `FIREBASE_MIGRATION.md` - Firebase migration details
- `FIRESTORE_API_EXAMPLE.md` - API route examples

---

**You're almost there! Just add those Firebase Admin credentials and you're good to go!** 🚀
