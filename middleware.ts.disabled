import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptAndVerify } from './src/lib/auth';

const USER_COOKIE_NAME = 'user';

export async function middleware(request: NextRequest) {
  // Clone the request headers to be able to modify them
  const requestHeaders = new Headers(request.headers);
  
  const tokenCookie = request.cookies.get(USER_COOKIE_NAME);

  if (tokenCookie) {
    const token = tokenCookie.value;
    const decryptedUserId = await decryptAndVerify(token);

    if (decryptedUserId) {
      // If the token is valid, pass the user ID in the request headers
      // to API routes and server components.
      requestHeaders.set('x-user-id', decryptedUserId);
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
  matcher: ['/api/:path*', '/:path*'],
};
