/**
 * @fileoverview Blog Search page - Client component.
 * Fetches user session and renders the blog search interface with navbar and footer.
 */

"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import ClientNavbar from '@/components/ClientNavbar';
import Footer from '@/components/Footer';
import BlogSearchWrapper from './BlogSearchWrapper';

/**
 * BlogSearchPage - Client component for blog search page.
 * Fetches current user session data and displays the blog search interface.
 * Manages user state and displays navbar with user information if authenticated.
 * @function BlogSearchPage
 * @returns {React.ReactNode} The blog search page component
 */
export default function BlogSearchPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [userPerms, setUserPerms] = useState<{ permsLabel: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname();
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUsername(data.user.name);
            setUserPerms({ permsLabel: data.user.permsLabel });
          } else {
            setUsername(null);
            setUserPerms(null);
          }
        } else {
          setUsername(null);
          setUserPerms(null);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        setUsername(null);
        setUserPerms(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserSession();
  }, []);

  // Determine currentPage for Navbar
  const currentPage = pathname ? pathname.split('/').pop() : '';

  return (
    <>
      <ClientNavbar
        username={username}
        currentPage={currentPage}
        user={userPerms}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogSearchWrapper />
      </Suspense>
      <Footer />
    </>
  );
}
