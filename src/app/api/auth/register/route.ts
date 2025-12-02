/**
 * @fileoverview User Registration API Route
 * @description Handles new user account creation with secure password hashing
 * and automatic login after successful registration.
 * 
 * @module api/auth/register
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { encryptAndSign } from '@/lib/auth';
import {
  PBKDF2_ITERATIONS,
  PBKDF2_KEY_LENGTH,
  PBKDF2_DIGEST,
  SALT_BYTES
} from '@/lib/constants'; // Import hashing constants
import { promisify } from 'util';

// Node.js 'crypto' for server-side operations
let nodeCrypto: typeof import('crypto');
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  nodeCrypto = require('crypto');
} else {
  throw new Error('Node.js crypto is required for this API route.');
}

// Promisify the crypto functions
const pbkdf2Async = promisify(nodeCrypto.pbkdf2);
const randomBytes = promisify(nodeCrypto.randomBytes);

/**
 * POST /api/auth/register
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request containing registration data
 * @returns {Promise<NextResponse>} JSON response with registration status
 * 
 * @description Creates a new user account with provided credentials.
 * Validates all required fields, checks for duplicate email/username,
 * hashes password with PBKDF2, and automatically logs in the new user.
 * 
 * @request {Object} request.body
 * @request {string} request.body.name - User's full name
 * @request {string} request.body.email - User's email (must be unique)
 * @request {string} request.body.username - User's username (must be unique)
 * @request {string} request.body.password - User's plaintext password
 * 
 * @response {200} Account created and user logged in
 *   @response {string} message - "Login successful"
 *   @response {Object} Set-Cookie - HTTP-only authentication cookie
 * 
 * @response {400} Missing required fields
 *   @response {string} message - "Name, username, email, and password are required."
 * 
 * @response {409} Duplicate email or username
 *   @response {string} message - "A user with this email or username already exists."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection or crypto operation failures
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, username } = await request.json();

    if (!name || !email || !password || !username) {
      return NextResponse.json({ message: 'Name, username, email, and password are required.' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'A user with this email or username already exists.' }, { status: 409 });
    }

    // --- Create new user ---

    // 1. Hash the password
    const salt = (await randomBytes(SALT_BYTES)).toString('hex');
    const hash = (await pbkdf2Async(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST)).toString('hex');

    // 2. Create and save the new user
    const newUser = new User({
      name,
      email,
      username,
      perms: process.env.USER_PERM_STR || 'user_perm', // Default to user permission
      salt,
      hash,
    });

    await newUser.save();

    // --- Automatically log the new user in ---

    // 3. Create a secure token
    const token = await encryptAndSign(newUser._id.toString());

    // 4. Set the cookie
    const response = NextResponse.json(
      { message: 'Login successful'},
      { status: 200 }
    );

    response.cookies.set('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

