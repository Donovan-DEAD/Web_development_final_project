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

// Node.js 'crypto' for server-side operations
let nodeCrypto: typeof import('crypto');
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  nodeCrypto = require('crypto');
} else {
  throw new Error('Node.js crypto is required for this API route.');
}

// Promisify the crypto functions
const pbkdf2 = nodeCrypto.pbkdf2.bind(nodeCrypto);
const randomBytes = nodeCrypto.randomBytes.bind(nodeCrypto);

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, username } = await request.json();
    console.log('Registration request received:', { name, email, password, username });

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
    const hash = (await pbkdf2(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST)).toString('hex');

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
    cookies().set('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    // 5. Return a success response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      perms: newUser.perms,
    }

    return NextResponse.json({ message: 'Registration successful', user: userResponse }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

