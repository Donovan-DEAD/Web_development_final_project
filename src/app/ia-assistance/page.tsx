import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server-auth';
import IaAssistanceWrapper from './IaAssistanceWrapper';
import Footer from '@/components/Footer';

export default async function IaAssistancePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // If the user is authenticated, render the client component
  return (
    <>
      <IaAssistanceWrapper />
      <Footer />
    </>
  );
}
