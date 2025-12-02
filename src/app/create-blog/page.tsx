/**
 * @fileoverview Create Blog page - Server component.
 * Handles authorization checks and renders the blog creation interface.
 * This is a server component that verifies user authentication and editor/admin permissions.
 */

"use server"
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server-auth';
import CreateBlogWrapper from './CreateBlogWrapper';
import Footer from '@/components/Footer';
import { IUser } from '@/lib/models/user';

/**
 * CreateBlogPage - Server component for blog creation interface.
 * Requires user to be authenticated and have editor or admin permissions.
 * Redirects to login if not authenticated, or to home if lacking permissions.
 * @async
 * @function CreateBlogPage
 * @returns {Promise<React.ReactNode>} The blog creation page or redirect
 */
export default async function CreateBlogPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const authorizedPerms = [
    process.env.EDITOR_PERM_STR || 'EDITOR',
    process.env.ADMIN_PERM_STR || 'ADMIN',
  ];

  if (!authorizedPerms.includes(user.perms)) {
    redirect('/');
  }

  // If the user is authenticated and authorized, render the wrapper
  return (
    <>
      <CreateBlogWrapper authenticatedUser={user} />
      <Footer />
    </>
  );
}