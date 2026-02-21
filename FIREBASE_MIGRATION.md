# Firebase Migration Guide

This document explains the migration from MongoDB/Mongoose/JWT to Firebase Authentication and Firestore.

## What Changed

### Removed
- MongoDB connection (`src/lib/connectDB.ts`)
- Mongoose models (`src/lib/models/*.schema.ts`)
- Custom JWT authentication (`src/lib/auth.ts`)
- Dependencies: `mongoose`, `bcryptjs`, `jose`

### Added
- Firebase Admin SDK (`src/lib/firebaseAdmin.ts`)
- Firebase Client SDK (`src/lib/firebase.ts`)
- Firestore TypeScript types (`src/lib/types/firestore.ts`)
- Firestore helper functions (`src/lib/firestoreHelpers.ts`)
- Firebase Auth hook (`src/hooks/useFirebaseAuth.ts`)
- Dependencies: `firebase`, `firebase-admin`

### Updated
- Login route: Now uses Firebase ID tokens and session cookies
- Register route: Creates user in Firestore after Firebase Auth
- Logout route: Clears Firebase session cookie

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Google Sign-In:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add authorized domains

### 3. Get Firebase Configuration

#### Client Configuration (Public)
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web app" icon to create a web app
4. Copy the configuration values

#### Admin Configuration (Server-side)
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values needed

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side only)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

### 5. Firestore Database Setup

1. Go to Firestore Database in Firebase Console
2. Click "Create database"
3. Choose production mode
4. Select a location

#### Create Collections

The app uses these Firestore collections:
- `users` - User profiles with roles
- `drivers` - Driver information
- `vehicles` - Vehicle fleet data
- `trips` - Trip records
- `expenses` - Expense tracking

#### Security Rules (Example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Other collections - adjust based on your needs
    match /{collection}/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Authentication Flow

### Registration
1. User signs in with Google (client-side)
2. Firebase returns ID token
3. Client sends ID token + user details to `/api/auth/register`
4. Server verifies token and creates user document in Firestore
5. User document includes: uid, email, name, role, isActive

### Login
1. User signs in with Google (client-side)
2. Firebase returns ID token
3. Client sends ID token to `/api/auth/login`
4. Server verifies token, checks Firestore for user data
5. Server creates session cookie and returns user info

### Frontend Usage Example

```typescript
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

function LoginPage() {
  const { signInWithGoogle, user, loading } = useFirebaseAuth();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const idToken = await user.getIdToken();
      
      // Send to your backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      
      const data = await response.json();
      // Handle success
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}
```

## Data Migration

If you have existing MongoDB data, you'll need to migrate it to Firestore:

1. Export data from MongoDB
2. Transform to match Firestore types (see `src/lib/types/firestore.ts`)
3. Use Firebase Admin SDK to batch import
4. Update document IDs (MongoDB ObjectId → Firestore auto-generated IDs)

## API Routes Updates Needed

Your existing API routes that use Mongoose models will need updates:

- `/api/drivers/route.ts` - Use `firestoreHelpers.ts` functions
- `/api/vehicles/route.ts` - Use `firestoreHelpers.ts` functions
- `/api/trips/route.ts` - Use `firestoreHelpers.ts` functions
- `/api/expenses/route.ts` - Use `firestoreHelpers.ts` functions
- `/api/analytics/route.ts` - Query Firestore instead of MongoDB

Example conversion:
```typescript
// Before (MongoDB)
const drivers = await Driver.find({});

// After (Firestore)
import { getDrivers } from '@/lib/firestoreHelpers';
const drivers = await getDrivers();
```

## Testing

1. Start the development server: `npm run dev`
2. Test Google Sign-In flow
3. Verify user creation in Firestore Console
4. Test session persistence
5. Test logout functionality

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to authorized domains in Firebase Console

### "Private key must be a string"
- Ensure FIREBASE_PRIVATE_KEY includes quotes and newlines are escaped

### "Firebase Admin SDK initialization failed"
- Verify all three admin environment variables are set correctly
- Check that private key format is correct

## Next Steps

1. Update all API routes to use Firestore
2. Implement proper Firestore security rules
3. Add error handling and validation
4. Consider adding email/password auth as alternative to Google
5. Set up Firebase indexes for complex queries
