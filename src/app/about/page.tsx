"use client";

import React, { useState, useEffect } from 'react';
import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";
import './about.css';

export default function AboutPage() {
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

  return (
    <>
      <ClientNavbar username={username} currentPage="about" user={user} />
      <section className="about-section">
        <h1>Quiénes somos</h1>
        <div className="about-content">
          <p>
            Somos una plataforma dedicada a revolucionar la agricultura moderna mediante inteligencia artificial
            y tecnología accesible.
          </p>
          <p>
            Nuestro objetivo es empoderar a agricultores de todos los niveles con herramientas de análisis visual,
            contenido educativo especializado y una comunidad de innovadores agrícolas.
          </p>
          <p>
            Creemos que la tecnología debe ser accesible, gratuita y diseñada pensando en los agricultores reales
            y sus necesidades cotidianas.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
