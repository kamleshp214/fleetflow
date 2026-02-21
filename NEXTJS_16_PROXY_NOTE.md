# Next.js 16 Proxy Convention

## Important Note

Next.js 16 has changed the middleware convention from `middleware.ts` to `proxy.ts`.

### What Changed

**Before (Next.js 15 and earlier):**
```
src/middleware.ts
export function middleware(req: NextRequest) { ... }
```

**Now (Next.js 16):**
```
src/proxy.ts
export function proxy(req: NextRequest) { ... }
```

### Why This Matters

If you have both `middleware.ts` and `proxy.ts` files, Next.js 16 will throw an error:

```
Error: Both middleware file "./src\middleware.ts" and proxy file "./src\proxy.ts" 
are detected. Please use "./src\proxy.ts" only.
```

### Our Implementation

Your project now uses `src/proxy.ts` which:
- ✅ Follows Next.js 16 conventions
- ✅ Protects dashboard routes
- ✅ Checks for Firebase session cookies
- ✅ Redirects unauthenticated users
- ✅ Includes optional RBAC support

### The Proxy File

Located at: `src/proxy.ts`

```typescript
export async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get('fleet_session')?.value;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
```

### Optional RBAC

The proxy file includes commented-out RBAC code. To enable role-based access control:

1. Uncomment the RBAC block in `src/proxy.ts`
2. The `user_role` cookie is already set by the login route
3. Define your role matrix:

```typescript
const rbacMatrix: Record<string, string[]> = {
  '/dashboard/manager': ['Manager'],
  '/dashboard/dispatcher': ['Dispatcher', 'Manager'],
  '/dashboard/safety': ['Safety Officer', 'Manager'],
  '/dashboard/finance': ['Financial Analyst', 'Manager'],
};
```

### Protected Routes

The proxy currently protects:
- `/dashboard/*` - All dashboard pages
- `/login` - Redirects if authenticated
- `/register` - Redirects if authenticated

### Configuration

```typescript
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};
```

### Learn More

- [Next.js 16 Proxy Documentation](https://nextjs.org/docs/messages/middleware-to-proxy)
- [Next.js Middleware Guide](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**Your app now follows Next.js 16 conventions!** ✅
