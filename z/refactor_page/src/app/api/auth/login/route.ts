import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { encryptAndSign } from '@/lib/auth';

// Promisify the crypto.pbkdf2 function
const pbkdf2 = crypto.pbkdf2.bind(crypto);

// These constants are the default for passport-local-mongoose, which was used before.
const PBKDF2_ITERATIONS = 10000;
const PBKDF2_KEY_LENGTH = 512;
const PBKDF2_DIGEST = 'sha512';

async function verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
  const derivedKey = await pbkdf2(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST);
  const derivedKeyHex = derivedKey.toString('hex');
  return crypto.timingSafeEqual(Buffer.from(derivedKeyHex), Buffer.from(hash));
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log(await request.json())
    console.log(email, password)
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
    const token = encryptAndSign(user._id.toString());

    // 2. Set the cookie
    cookies().set('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    // Omit sensitive data from the returned user object
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      perms: user.perms,
    }

    return NextResponse.json({ message: 'Login successful', user: userResponse }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
