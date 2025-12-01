import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import connectToDatabase from './db';
import User, { IUser } from './models/user';
import mongoose from 'mongoose';

/**
 * Retrieves the currently authenticated user from the database.
 * This function is designed to be used within Next.js API Routes or Route Handlers.
 * It reads the user ID from the 'x-user-id' header, which is set by the middleware.
 * 
 * @returns {Promise<IUser | null>} A promise that resolves to the Mongoose user document or null if not authenticated.
 */
export async function getCurrentUser(): Promise<IUser | null> {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');

  if (!userId) {
    return null;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error('Invalid user ID format in header:', userId);
    return null;
  }

  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export const inversePermsMap = ()=>{
  const inverseMap: { [key: string]: string } = {
    'admin': process.env.ADMIN_PERM_STR || 'admin_perm',
    'user': process.env.USER_PERM_STR || 'user_perm',
    'editor': process.env.EDITOR_PERM_STR || 'editor_perm',
  };
  return inverseMap;
}