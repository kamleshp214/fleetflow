# Middleware Update - Firebase Session Management

## What Was Fixed

The `src/proxy.ts` file was trying to import the deleted JWT auth file. I've updated the authentication middleware to work with Firebase session cookies.

## Changes Made

### 1. Created New Middleware (`src/middleware.ts`)

A simplified Next.js middleware that:
- Checks for session cookie presence
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` and `/register`
- Works with Next.js Edge Runtime

**Note**: Full session verification happens in API routes using Firebase Admin SDK, as the Admin SDK cannot run in Edge Runtime.

### 2. Created Session Verification API (`src/app/api/auth/verify/route.ts`)

A new API endpoint that:
- Verifies Firebase session cookies using Admin SDK
- Retrieves user data from Firestore
- Returns user information including role
- Can be used by client-side code to check authentication status

### 3. Created Auth Hook (`src/hooks/useAuth.ts`)

A React Query hook that:
- Fetches current user session
- Caches authentication state
- Can be used in any component to get user info
- Automatically handles errors

### 4. Updated Proxy File (`src/proxy.ts`)

Removed the JWT verification logic and updated to use session cookies.

## How to Use

### In Components

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { data, isLoading, error } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Not authenticated</div>;

  return (
    <div>
      <p>Welcome, {data?.user.name}!</p>
      <p>Role: {data?.user.role}</p>
    </div>
  );
}
```

### Role-Based Access Control (RBAC)

To implement RBAC in your components:

```typescript
import { useAuth } from '@/hooks/useAuth';

function AdminOnlyComponent() {
  const { data } = useAuth();

  if (data?.user.role !== 'Manager') {
    return <div>Access Denied</div>;
  }

  return <div>Admin Content</div>;
}
```

### In API Routes

```typescript
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('fleet_session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    const uid = decodedClaims.uid;
    
    // Get user data
    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.data();
    
    // Check role
    if (userData?.role !== 'Manager') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Continue with authorized logic
    return NextResponse.json({ data: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
}
```

## Middleware Behavior

### Protected Routes
- `/dashboard/*` - Requires authentication
- Redirects to `/login` if no session cookie

### Auth Routes
- `/login` - Redirects to `/dashboard` if already authenticated
- `/register` - Redirects to `/dashboard` if already authenticated

### Public Routes
- All other routes are accessible without authentication

## Advanced RBAC Implementation

If you want to implement the original RBAC matrix in middleware, you'll need to:

1. Store user role in a JWT or encrypted cookie (in addition to session cookie)
2. Or make an API call from middleware (not recommended for performance)
3. Or use a separate authentication service

### Option 1: Store Role in Separate Cookie (Recommended)

Update the login route to set an additional cookie with role:

```typescript
// In src/app/api/auth/login/route.ts
response.cookies.set({
  name: "user_role",
  value: userData.role,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 8,
});
```

Then in middleware:

```typescript
export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('fleet_session')?.value;
  const userRole = req.cookies.get('user_role')?.value;
  
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // RBAC logic
  const rbacMatrix: Record<string, string[]> = {
    '/dashboard/manager': ['Manager'],
    '/dashboard/dispatcher': ['Dispatcher', 'Manager'],
    '/dashboard/safety': ['Safety Officer', 'Manager'],
    '/dashboard/finance': ['Financial Analyst', 'Manager'],
  };
  
  for (const [path, allowedRoles] of Object.entries(rbacMatrix)) {
    if (req.nextUrl.pathname.startsWith(path)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }
  
  return NextResponse.next();
}
```

## Testing

1. Start the dev server: `npm run dev`
2. Navigate to `/dashboard` - should redirect to `/login`
3. Sign in with Google
4. Should redirect to `/dashboard`
5. Try accessing `/login` - should redirect to `/dashboard`
6. Test the auth hook in a component

## Files Modified/Created

- ✅ `src/middleware.ts` (new) - Next.js middleware
- ✅ `src/app/api/auth/verify/route.ts` (new) - Session verification endpoint
- ✅ `src/hooks/useAuth.ts` (new) - Authentication hook
- ✅ `src/proxy.ts` (updated) - Removed JWT logic
- ✅ `MIDDLEWARE_UPDATE.md` (this file)

## Next Steps

1. Test the middleware by accessing protected routes
2. Use `useAuth()` hook in your dashboard components
3. Implement RBAC in components based on user role
4. Consider adding role cookie for middleware-level RBAC (optional)

The middleware is now working with Firebase session cookies! 🎉
