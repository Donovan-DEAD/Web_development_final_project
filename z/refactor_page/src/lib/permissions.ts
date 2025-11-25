import { redirect } from 'next/navigation';
import { headers } from 'next/headers'; // Import headers to read request headers
import connectToDatabase from './db';
import User, { IUser } from './models/user';

/**
 * Server-side utility to get the authenticated user and check their permissions.
 * It reads the 'x-user-id' header, which is set by the middleware after token verification.
 * If the user is not authenticated or does not have the required permissions,
 * it will redirect to a specified path.
 *
 * @param requiredPerms An array of permission strings that the user must have at least one of.
 * @param redirectTo The path to redirect to if the user is not authorized. Defaults to '/login'.
 * @returns The authenticated user object (IUser) if authorized, otherwise never returns (due to redirect).
 */
export async function authenticateAndAuthorize(
  requiredPerms: string[] = [],
  redirectTo: string = '/login'
): Promise<IUser> {
  console.log('Authenticating and authorizing user...')

  const requestHeaders = await headers();
  const userId = requestHeaders.get('x-user-id');
  console.log(userId)
  if (!userId) {
    // User is not authenticated (middleware didn't find a valid token or user)
    redirect(redirectTo);
  }

  await connectToDatabase();
  const user = await User.findById(userId); // Ensure perms is selected
  if (!user) {
    console.log('User not found')
    // User ID from header did not correspond to an existing user
    redirect(redirectTo);
  }

  // Check permissions
  const userPerms = user.perms;
  const isAuthorized = requiredPerms.length === 0 || requiredPerms.includes(userPerms);

  if (!isAuthorized) {
    console.log('User not authorized')
    // User does not have the required permissions
    redirect(redirectTo);
  }

  return user;
}