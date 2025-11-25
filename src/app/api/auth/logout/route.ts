import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const USER_COOKIE_NAME = 'user';

export async function POST() {
  // To log out, we simply delete the cookie.
      
  const response = NextResponse.json(
    { message: 'Logout successful'},
    { status: 200 }
  );

  response.cookies.delete(USER_COOKIE_NAME);

  return response;
}
