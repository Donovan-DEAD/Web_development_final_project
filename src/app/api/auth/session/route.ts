/**
 * @fileoverview User Session API Route
 * @description Retrieves current authenticated user information from the session cookie.
 * 
 * @module api/auth/session
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { decryptAndVerify } from '@/lib/auth';

/**
 * GET /api/auth/session
 * 
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request with authentication cookie
 * @returns {Promise<NextResponse>} JSON response with user data or null
 * 
 * @description Retrieves the currently authenticated user's information.
 * Validates the authentication cookie token and returns the user's name and permissions.
 * Returns null if no valid token or user not found.
 * 
 * @response {200} Success (with or without user data)
 *   @response {Object} user - User object or null if not authenticated
 *   @response {string} user.name - User's full name
 *   @response {string} user.permsLabel - User's permission level label
 * 
 * @throws {Error} Database connection failures
 */
export async function GET(request: NextRequest) {
  const tokenCookie = request.cookies.get('user');
  if (tokenCookie) {
    const token = tokenCookie.value;
    const decryptedUserId = await decryptAndVerify(token);
    if (decryptedUserId) {
      
      await connectToDatabase();
      const user = await User.findById(decryptedUserId);

      if (!user) {
        return NextResponse.json({ user: null });
      }
      return NextResponse.json({
        user: {
          name: user.name,
          permsLabel: user.permsLabel,
        },
      })
    }
  }
  
  return NextResponse.json({ user: null });
  
}