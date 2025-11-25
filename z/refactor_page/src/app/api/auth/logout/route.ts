import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const USER_COOKIE_NAME = 'user';

export async function POST() {
  // To log out, we simply delete the cookie.
  cookies().delete(USER_COOKIE_NAME);

  return NextResponse.json({ message: 'Logout successful' });
}
