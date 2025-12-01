"use server"
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server-auth';
import CreateBlogWrapper from './CreateBlogWrapper';
import Footer from '@/components/Footer';
import { IUser } from '@/lib/models/user';

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