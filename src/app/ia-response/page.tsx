import { getCurrentUser } from '@/lib/server-auth';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import IaResponseClient from './IaResponseClient';
import { redirect } from 'next/navigation';

export default async function IaResponsePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <ClientNavbar
        username={user.name}
        currentPage="ia-response"
        user={{ permsLabel: user.permsLabel }}
      />
      <IaResponseClient />
      <Footer />
    </>
  );
}
