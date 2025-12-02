/**
 * @fileoverview User Logout API Route
 * @description Handles user logout by clearing the authentication cookie.
 * 
 * @module api/auth/logout
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** @constant {string} USER_COOKIE_NAME - Name of the authentication cookie */
const USER_COOKIE_NAME = 'user';

/**
 * POST /api/auth/logout
 * 
 * @async
 * @function POST
 * @returns {Promise<NextResponse>} JSON response indicating logout was successful
 * 
 * @description Clears the user authentication cookie, effectively logging out the user.
 * This is a simple operation that removes the HTTP-only cookie containing the encrypted user token.
 * 
 * @response {200} Successful logout
 *   @response {string} message - "Logout successful"
 */
export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout successful'},
    { status: 200 }
  );

  response.cookies.delete(USER_COOKIE_NAME);

  return response;
}
