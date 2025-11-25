import { cookies } from 'next/headers';
import { decryptAndVerify } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import User, { IUser } from '@/lib/models/user';

const USER_COOKIE_NAME = 'user';

/**
 * Retrieves the currently authenticated user from the request cookie.
 * This is a server-side utility.
 *
 * @returns {Promise<IUser | null>} The user object if authenticated, otherwise null.
 */
export async function getCurrentUser(): Promise<IUser | null> {
  const tokenCookie = (await cookies()).get(USER_COOKIE_NAME);

  if (tokenCookie) {
    const token = tokenCookie.value;
    const decryptedUserId = await decryptAndVerify(token);

    if (decryptedUserId) {
      await connectToDatabase();
      const user = await User.findById(decryptedUserId); // Use .lean() for faster, plain JS objects
      if (user) {
        return user as IUser;
      }
    }
  }

  return null;
}
