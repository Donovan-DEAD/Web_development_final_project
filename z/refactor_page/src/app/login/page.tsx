"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from "@/components/Toast";

interface LoginPageProps {
  // message: string | null; // This will likely come from URL params or client-side state after redirect
  // For initial migration, we'll simulate this with local state
}

export default function LoginPage({}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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
      router.push('/');
    } else {
      // Login failed, display error message
      setMessage(data.message || 'Login failed.');
    }
  };

  return (
    <>
      {message && <Toast message={message} severity="error" />}

      <div className="login">
        <div className="login__container">
          <h1 className="login__title">Iniciar Sesión</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              className="login__form__input"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login__form__input"
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__form__button" type="submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
