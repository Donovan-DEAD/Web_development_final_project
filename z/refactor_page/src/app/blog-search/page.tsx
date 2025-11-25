"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import ClientNavbar from '@/components/ClientNavbar';
import BlogSearchWrapper from './BlogSearchWrapper';

export default function BlogSearchPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [userPerms, setUserPerms] = useState<{ permsLabel: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter(); // Initialize useRouter

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
  const currentPage = router.pathname ? router.pathname.split('/').pop() : '';

  return (
    <>
      <ClientNavbar
        username={username}
        currentPage={currentPage}
        user={userPerms}
      />
      <BlogSearchWrapper />
    </>
  );
}
