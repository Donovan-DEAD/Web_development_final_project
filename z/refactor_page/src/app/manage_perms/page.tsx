import { redirect } from 'next/navigation';
import ClientNavbar from '@/components/ClientNavbar';
import { getCurrentUser } from '@/lib/server-auth';
import ManagePermsWrapper from './ManagePermsWrapper';

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