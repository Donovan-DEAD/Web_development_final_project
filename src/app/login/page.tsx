/**
 * @fileoverview Login page for user authentication.
 * Allows existing users to authenticate with their email and password.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClientNavbar from "@/components/ClientNavbar";
import Toast from "@/components/Toast";

/**
 * Interface for LoginPage component props.
 * @interface LoginPageProps
 */
interface LoginPageProps {
  // message: string | null; // This will likely come from URL params or client-side state after redirect
  // For initial migration, we'll simulate this with local state
}

/**
 * LoginPage component - User login form page.
 * Allows existing users to authenticate with email and password.
 * Displays error messages via Toast component and redirects on successful login.
 * @function LoginPage
 * @param {LoginPageProps} props - Component props (currently empty)
 * @returns {React.ReactNode} The login page component
 */
export default function LoginPage({}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setUsername(data.user?.name || null);
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null); // Clear previous messages

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, redirect to home page as in original EJS
      window.location.href = '/';
    } else {
      // Login failed, display error message
      setMessage(data.message || 'Login failed.');
    }
  };

  return (
    <>
      <ClientNavbar username={username} currentPage="login" user={user} />
      {message && <Toast message={message} severity="error" />}

      <div className="login">
        <div className="login__container">
          <h1 className="login__title">Login</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              className="login__form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login__form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__form__button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
