import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 proxy file for route protection
// Checks for Firebase session cookie presence
// Full verification happens in API routes using Firebase Admin SDK

// Optional: Role-Based Access Control matrix
// Uncomment and use if you set user_role cookie in login route
const rbacMatrix: Record<string, string[]> = {
  '/dashboard/manager': ['Manager'],
  '/dashboard/dispatcher': ['Dispatcher', 'Manager'],
  '/dashboard/safety': ['Safety Officer', 'Manager'],
  '/dashboard/finance': ['Financial Analyst', 'Manager'],
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get the Firebase session cookie
  const sessionCookie = req.cookies.get('fleet_session')?.value;
  const userRole = req.cookies.get('user_role')?.value;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Optional: RBAC - Check if user has permission for specific routes
    // Uncomment this block to enable role-based access control
    /*
    for (const [protectedPath, allowedRoles] of Object.entries(rbacMatrix)) {
      if (pathname.startsWith(protectedPath)) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        break;
      }
    }
    */
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if ((pathname === '/login' || pathname === '/register') && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};