"use server"
import { headers } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import ClientNavbar from './ClientNavbar';
import { IUser } from '@/lib/models/user';

interface ServerNavbarProps {
  // No longer needed as we get it from headers
  // currentPage: string; 
}

export default async function ServerNavbar({}: ServerNavbarProps) {
  const requestHeaders = await headers();
  const userId = requestHeaders.get('x-user-id');
  const path = requestHeaders.get('x-current-path');

  let currentPage = 'home'; // Default value
  if (path) {
    if (path === '/') {
      currentPage = 'home';
    } else {
      const pathParts = path.split('/').filter(part => part); // filter to remove empty strings
      currentPage = pathParts[pathParts.length - 1];
    }
  }

  let user: IUser | null = null;
  let username: string | null = null;

  if (userId) {
    await connectToDatabase();
    // Select hash and salt to ensure Mongoose returns the full User object for virtuals to work
    // We only need perms for Navbar, but fetching full user is fine.
    const fetchedUser = await User.findById(userId).select('+perms +permsLabel'); 
    
    if (fetchedUser) {
      user = JSON.parse(JSON.stringify(fetchedUser)); // Convert Mongoose document to plain object
      username = fetchedUser.name;
    }
  } 

  return (
    <ClientNavbar
      username={username}
      currentPage={currentPage}
      user={user ? { permsLabel: user.permsLabel } : null}
    />
  );
}
