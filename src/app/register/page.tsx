"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClientNavbar from "@/components/ClientNavbar";
import Toast from "@/components/Toast";

interface RegisterPageProps {
  // message: string | null; // This will likely come from URL params or client-side state after redirect
}

export default function RegisterPage({}: RegisterPageProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // This is email in the backend
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [navbarUsername, setNavbarUsername] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setNavbarUsername(data.user?.name || null);
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null); // Clear previous messages

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email: username, password }), // `username` is `email` in backend
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful, redirect to home page as in original EJS
      window.location.href = '/';
    } else {
      // Registration failed, display error message
      setMessage(data.message || 'Registration failed.');
    }
  };

  return (
    <>
      <ClientNavbar username={navbarUsername} currentPage="register" user={user} />
      {message && <Toast message={message} severity="error" />}

      <div className="register">
        <div className="register__container">
          <h1 className="register__title">Registrarse</h1>
          <form className="register__form" onSubmit={handleSubmit}>
            <input
              className="register__form__input"
              type="text"
              name="name"
              placeholder="Nombre"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="register__form__input"
              type="email"
              name="username"
              placeholder="Correo Electrónico"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="register__form__input"
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register__form__button" type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
