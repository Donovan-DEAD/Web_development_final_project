/**
 * @fileoverview AI Assistance page - Server component.
 * Handles authentication checks and renders the AI crop analysis interface.
 * This is a server component that verifies user authentication before rendering.
 */

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server-auth';
import IaAssistanceWrapper from './IaAssistanceWrapper';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import { User } from '@supabase/supabase-js';

/**
 * IaAssistancePage - Server component for AI crop analysis interface.
 * Requires user to be authenticated. Redirects to login if not authenticated.
 * Renders the main AI assistance form for users to upload crop images and get AI analysis.
 * @async
 * @function IaAssistancePage
 * @returns {Promise<React.ReactNode>} The AI assistance page or redirect to login
 */
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
