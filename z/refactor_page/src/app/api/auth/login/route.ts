import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

async function verifyPassword(password: string, salt: string, hashHex: string): Promise<boolean> {
  const derivedKey = await pbkdf2Async(
    password,
    salt,
    PBKDF2_ITERATIONS,
    PBKDF2_KEY_LENGTH,
    PBKDF2_DIGEST
  ); // Buffer

  const hashBuffer = Buffer.from(hashHex, 'hex');

  console.log(derivedKey.length, hashBuffer.length)
  console.log(derivedKey, hashBuffer)

  // timingSafeEqual requiere longitudes iguales
  if (derivedKey.length !== hashBuffer.length) return false;

  return nodeCrypto.timingSafeEqual(derivedKey, hashBuffer);
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await connectToDatabase();

    // passport-local-mongoose uses 'username' for the email field in this setup
    const user = await User.findOne({ email: email }).select('+hash +salt');

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

