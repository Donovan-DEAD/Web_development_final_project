/**
 * @fileoverview AI Response page - Server component.
 * Handles authentication checks and renders the AI analysis response display.
 * This is a server component that verifies user authentication before rendering.
 */

import { getCurrentUser } from '@/lib/server-auth';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import IaResponseClient from './IaResponseClient';
import { redirect } from 'next/navigation';

/**
 * IaResponsePage - Server component for displaying AI analysis responses.
 * Requires user to be authenticated. Redirects to login if not authenticated.
 * @async
 * @function IaResponsePage
 * @returns {Promise<React.ReactNode>} The AI response page or redirect to login
 */
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
