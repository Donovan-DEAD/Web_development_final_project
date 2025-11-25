import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptAndVerify } from './src/lib/auth';

const USER_COOKIE_NAME = 'user';

export async function middleware(request: NextRequest) {
  // Clone the request headers to be able to modify them
  const requestHeaders = new Headers(request.headers);
  
  // Add the current path to the headers
  requestHeaders.set('x-current-path', request.nextUrl.pathname);

  const tokenCookie = request.cookies.get(USER_COOKIE_NAME);

  if (tokenCookie) {
    const token = tokenCookie.value;
    const decryptedUserId = await decryptAndVerify(token);

    if (decryptedUserId) {
      // If the token is valid, pass the user ID in the request headers
      // to API routes and server components.
      requestHeaders.set('x-user-id', decryptedUserId);
    } else {
      // If the token is invalid or expired, we can optionally remove the cookie
      // For now, we'll just ignore it and the request will be unauthenticated
    }
  }

  // Create a new response with the updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
