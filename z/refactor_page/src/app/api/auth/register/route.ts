import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { encryptAndSign } from '@/lib/auth';

// Promisify the crypto functions
const pbkdf2 = crypto.pbkdf2.bind(crypto);
const randomBytes = crypto.randomBytes.bind(crypto);

// Constants for password hashing, matching the login logic
const PBKDF2_ITERATIONS = 10000;
const PBKDF2_KEY_LENGTH = 512;
const PBKDF2_DIGEST = 'sha512';
const SALT_BYTES = 16;

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
    const token = encryptAndSign(newUser._id.toString());

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
