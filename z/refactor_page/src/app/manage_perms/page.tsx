import { authenticateAndAuthorize } from '@/lib/permissions';
import ManagePermsWrapper from './ManagePermsWrapper';
import { headers } from 'next/headers';

export default async function ManagePermsPage() {
  const user = await authenticateAndAuthorize([process.env.ADMIN_PERM_STR || 'admin_perm'], '/login');

  // If authenticateAndAuthorize does not redirect, it means the user is authenticated and authorized
  return <ManagePermsWrapper authenticatedUser={user} />;
}