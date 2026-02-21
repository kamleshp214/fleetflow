# 🔧 Private Key Format Fix

## The Error You're Seeing

```
Error: Failed to parse private key: Error: Invalid PEM formatted message.
```

This means the `FIREBASE_PRIVATE_KEY` in your `.env.local` file isn't formatted correctly.

## ✅ How to Fix It

### Step 1: Get Your Private Key

1. Open the JSON file you downloaded from Firebase Console
2. Find the `"private_key"` field
3. It will look like this:

```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n...many more lines...\n-----END PRIVATE KEY-----\n"
}
```

### Step 2: Copy the ENTIRE Value

Copy everything between the quotes, including:
- `-----BEGIN PRIVATE KEY-----`
- All the `\n` characters (these are important!)
- All the random letters and numbers
- `-----END PRIVATE KEY-----`

### Step 3: Format It Correctly in .env.local

Your `.env.local` file should look like this:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**CRITICAL RULES:**
1. ✅ Keep the double quotes `"` at the start and end
2. ✅ Keep ALL the `\n` characters (they represent line breaks)
3. ✅ It should be ONE long line
4. ✅ No spaces before or after the quotes
5. ✅ Include `-----BEGIN PRIVATE KEY-----` at the start
6. ✅ Include `-----END PRIVATE KEY-----` at the end

### Example (Correct Format)

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXyZ...(lots more characters)...xyz\n-----END PRIVATE KEY-----\n"
```

## 🚫 Common Mistakes

### Mistake 1: Removing the \n characters
```env
# ❌ WRONG - Don't remove \n
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvQIBADANBg...-----END PRIVATE KEY-----"
```

### Mistake 2: Adding actual line breaks
```env
# ❌ WRONG - Don't split into multiple lines
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBg...
-----END PRIVATE KEY-----"
```

### Mistake 3: Missing quotes
```env
# ❌ WRONG - Must have quotes
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n
```

### Mistake 4: Not copying the full key
```env
# ❌ WRONG - Must include BEGIN and END lines
FIREBASE_PRIVATE_KEY="MIIEvQIBADANBg..."
```

## 📋 Quick Checklist

Before saving `.env.local`, verify:

- [ ] `FIREBASE_CLIENT_EMAIL` is filled in (looks like: `firebase-adminsdk-xxxxx@fleetflow-5c1c7.iam.gserviceaccount.com`)
- [ ] `FIREBASE_PRIVATE_KEY` starts with `"-----BEGIN PRIVATE KEY-----\n`
- [ ] `FIREBASE_PRIVATE_KEY` ends with `\n-----END PRIVATE KEY-----\n"`
- [ ] The key has `\n` characters throughout (not actual line breaks)
- [ ] The entire key is on ONE line
- [ ] There are double quotes around the key
- [ ] No placeholder text like `YOUR_FIREBASE_PRIVATE_KEY_HERE`

## 🔍 How to Verify

After updating `.env.local`:

1. **Save the file**
2. **Restart the dev server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```
3. **Try logging in** at http://localhost:3000/login
4. **Check for errors** in the terminal

If you still see the "Failed to parse private key" error, double-check that you copied the ENTIRE key from the JSON file.

## 💡 Pro Tip: Use a Text Editor

1. Open the downloaded JSON file in a text editor (VS Code, Notepad++, etc.)
2. Find the `"private_key"` line
3. Select and copy the ENTIRE value between the quotes
4. Paste it directly into `.env.local` after `FIREBASE_PRIVATE_KEY=`
5. Make sure it's wrapped in quotes

## 🎯 Example from Real JSON

If your JSON file has this:

```json
{
  "type": "service_account",
  "project_id": "fleetflow-5c1c7",
  "private_key_id": "abc123def456",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXyZ\nABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrs\ntuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ab\ncdefghijklmnopqrstuvwxyz\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com"
}
```

Your `.env.local` should have:

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@fleetflow-5c1c7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXyZ\nABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrs\ntuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ab\ncdefghijklmnopqrstuvwxyz\n-----END PRIVATE KEY-----\n"
```

## 🆘 Still Having Issues?

If you're still getting the error after following these steps:

1. **Delete the `.env.local` file**
2. **Create a new one** from scratch
3. **Copy the client config** from `.env.example`
4. **Carefully copy** the `client_email` and `private_key` from your JSON file
5. **Make sure** there are no extra spaces or characters
6. **Save and restart** the server

## ✅ Success!

Once the key is formatted correctly, you should see:
- No more "Failed to parse private key" errors
- Login page loads successfully
- Google Sign-In works
- You can complete the authentication flow

---

**The key is to copy the EXACT value from the JSON file, including all the `\n` characters!** 🔑
