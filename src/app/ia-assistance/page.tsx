import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server-auth';
import IaAssistanceWrapper from './IaAssistanceWrapper';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import { User } from '@supabase/supabase-js';

export default async function IaAssistancePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // If the user is authenticated, render the client component
  return (
    <>
      <ClientNavbar username={user?.name || null} currentPage="ia-assistance" user={user ? { permsLabel: user.permsLabel } : null} />
      <IaAssistanceWrapper />
      <Footer />
    </>
  );
}
