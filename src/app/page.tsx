"use client";

import React, { useState, useEffect } from 'react';
import ClientNavbar from "@/components/ClientNavbar";
import Image from "next/image";
import favicon from "../../public/images/favicon.svg";
import fieldImage from "../../public/images/plantation_background.jpeg";

export default function HomePage() {
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
      <ClientNavbar username={username} currentPage="home" user={user} />
      <section className="main" style={{
        backgroundImage: `url(${fieldImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="main-content-box">
          <h1>
            Tu cultivo, <span className="highlight">
              <br />nuestra IA
            </span>
          </h1>
          <p>
            Transforma tu experiencia agrícola con análisis inteligente de cultivos, contenido
            especializado y una comunidad de agricultores innovadores.
          </p>
        </div>
      </section>

      <section className="analysis-box">
        <h2>Prueba el Análisis IA</h2>
        <p>Sube una foto y obtén un diagnóstico</p>
        <div className="upload-area">
          <p>
            📤 Arrastra tu imagen aquí <br /> o haz clic para seleccionar archivo
          </p>
        </div>
        <a href="/ia-assistance">
          <button className="btn-primary">Comenzar Análisis</button>
        </a>
      </section>

      <div className="style">
        <section className="features">
          <h2>Todo lo que necesitas en un solo lugar</h2>
          <p>
            Herramientas gratuitas diseñadas para ayudar a agricultores de todos los niveles
          </p>
          <div className="cards">
            <div className="card">
              <h3>Análisis Visual</h3>
              <p>
                Sube fotos de tus cultivos y recibe análisis detallados sobre salud, plagas y
                recomendaciones
              </p>
            </div>
            <div className="card">
              <h3>Blog Educativo</h3>
              <p>
                Artículos actualizados sobre técnicas agrícolas, tendencias y mejores prácticas
              </p>
            </div>
            {/* <div className="card">
            <h3>Newsletter</h3>
            <p>Recibe consejos semanales y las últimas novedades del mundo agrícola</p>
          </div> */}
          </div>
        </section>
      </div>

      <section className="cta">
        <h2>Comienza a usar tu el asistente de IA hoy</h2>
        <p>
          Completamente gratis. Sin registros complicados. Solo sube tu foto y explica tu
          situación.
        </p>
        <a href="/ia-assistance">
          <button className="btn-primary">Comenzar Análisis</button>
        </a>
      </section>
      <div className="style">
        {/* <footer className="newsletter">
          <h2>Mantente actualizado</h2>
          <p>Suscríbete a nuestro newsletter mensual para recibir consejos agrícolas y novedades.</p>
          <form>
            <input type="email" placeholder="tu@email.com">
            <button type="submit">Suscribirse</button>
          </form>
        </footer> */}
      </div>
    </>
  );
}