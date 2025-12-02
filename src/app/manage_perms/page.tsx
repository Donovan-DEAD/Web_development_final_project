/**
 * @fileoverview Manage Permissions page - Server component.
 * Handles authorization checks and renders the permissions management interface for admins.
 * This is a server component that verifies user authentication and admin status.
 */

import { redirect } from 'next/navigation';
import ClientNavbar from '@/components/ClientNavbar';
import { getCurrentUser } from '@/lib/server-auth';
import ManagePermsWrapper from './ManagePermsWrapper';

/**
 * ManagePermsPage - Server component for managing user permissions.
 * Requires user to be authenticated and have admin permissions.
 * Redirects to login if not authenticated, or to home if not an admin.
 * @async
 * @function ManagePermsPage
 * @returns {Promise<React.ReactNode>} The permissions management page or redirect
 */
export default async function ManagePermsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const adminPerm = process.env.ADMIN_PERM_STR || 'ADMIN';

  if (user.perms !== adminPerm) {
    redirect('/'); // Redirect to home if not an admin
  }

  // If the user is authenticated and authorized, render the wrapper
  return (
  <>
    <ClientNavbar username={user.name} currentPage="manage_perms" user={user} />
    <ManagePermsWrapper authenticatedUser={user} />
  </>
  )
  ;
}