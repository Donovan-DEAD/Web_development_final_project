/**
 * @fileoverview User Login API Route
 * @description Handles user authentication using email and password.
 * Verifies credentials against stored hashes using PBKDF2 and creates
 * a secure encrypted token stored in an HTTP-only cookie.
 * 
 * @module api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { encryptAndSign } from '@/lib/auth';
import { promisify } from 'util';
import {
  PBKDF2_ITERATIONS,
  PBKDF2_KEY_LENGTH,
  PBKDF2_DIGEST,
} from '@/lib/constants'; // Import hashing constants

// Node.js 'crypto' for server-side operations
let nodeCrypto: typeof import('crypto');
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  nodeCrypto = require('crypto');
} else {
  throw new Error('Node.js crypto is required for this API route.');
}

// Promisify the crypto.pbkdf2 function
const pbkdf2Async = promisify(nodeCrypto.pbkdf2);

/**
 * Verifies a password against a stored PBKDF2 hash using timing-safe comparison.
 * 
 * @async
 * @function verifyPassword
 * @param {string} password - The plaintext password to verify
 * @param {string} salt - The hex-encoded salt used in the hash
 * @param {string} hashHex - The hex-encoded PBKDF2 hash to compare against
 * @returns {Promise<boolean>} True if password matches, false otherwise
 * @throws {Error} If crypto operations fail
 * 
 * @description Uses timing-safe comparison to prevent timing attacks.
 * Automatically returns false if derived key and hash have different lengths.
 */
async function verifyPassword(password: string, salt: string, hashHex: string): Promise<boolean> {
  const derivedKey = await pbkdf2Async(
    password,
    salt,
    PBKDF2_ITERATIONS,
    PBKDF2_KEY_LENGTH,
    PBKDF2_DIGEST
  ); // Buffer

  const hashBuffer = Buffer.from(hashHex, 'hex');
  
  // timingSafeEqual requiere longitudes iguales
  if (derivedKey.length !== hashBuffer.length) return false;

  return nodeCrypto.timingSafeEqual(derivedKey, hashBuffer);
}

/**
 * POST /api/auth/login
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request containing email and password
 * @returns {Promise<NextResponse>} JSON response with login status
 * 
 * @description Authenticates a user with email and password credentials.
 * On success, creates an HTTP-only secure cookie with encrypted user token.
 * 
 * @request {Object} request.body
 * @request {string} request.body.email - User's email address
 * @request {string} request.body.password - User's plaintext password
 * 
 * @response {200} Successful login
 *   @response {string} message - "Login successful"
 * 
 * @response {400} Missing credentials
 *   @response {string} message - "Email and password are required."
 * 
 * @response {401} Invalid credentials
 *   @response {string} message - "Invalid credentials."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection or crypto operation failures
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await connectToDatabase();

    // passport-local-mongoose uses 'username' for the email field in this setup
    const user = await User.findOne({ email: email });

    if (!user || !user.salt || !user.hash) {
      // User not found or user record is missing password fields
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.salt, user.hash);
    
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // --- Authentication successful ---

    // 1. Create a secure token
    const token = await encryptAndSign(user._id.toString());
    // 2. Set the cookie
    
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
  
    return response

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

