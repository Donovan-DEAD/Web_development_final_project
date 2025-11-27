import React from 'react';
import { getCurrentUser } from '@/lib/server-auth';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import IaResponseClient from './IaResponseClient';

interface Technique {
  name: string;
  description: string;
}

interface GeminiResponseData {
  nivel_de_peligro: 'aprobado' | 'mejorable' | 'peligro';
  diagnostico: string;
  recomendations: string[];
  tecnicas_a_usar: Technique[];
  is_image_agricultural_related: boolean;
  is_context_agricultural_related: boolean;
}

export default async function IaResponsePage() {
  const user = await getCurrentUser();

  return (
    <>
      <ClientNavbar username={user?.name || null} currentPage="ia-assistance" user={user ? { permsLabel: user.permsLabel } : null} />
      <IaResponseClient />
      <Footer />
    </>
  );
}
