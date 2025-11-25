import { authenticateAndAuthorize } from '@/lib/permissions';
import CreateBlogWrapper from './CreateBlogWrapper';

export default async function CreateBlogPage() {
  const user = await authenticateAndAuthorize([
    process.env.EDITOR_PERM_STR || 'editor_perm',
    process.env.ADMIN_PERM_STR || 'admin_perm',
  ], '/');

  // If authenticateAndAuthorize does not redirect, it means the user is authenticated and authorized
  return <CreateBlogWrapper authenticatedUser={user} />;
}