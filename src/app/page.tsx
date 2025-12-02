/**
 * @fileoverview Home page of the Agritech application.
 * Displays the main landing page with features overview, AI analysis CTA, and team information.
 * This is a client component that fetches user session data on mount.
 */

"use client";

import React, { useState, useEffect } from 'react';
import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import favicon from "../../public/images/favicon.svg";
import fieldImage from "../../public/images/plantation_background.jpeg";

/**
 * HomePage component - Main landing page of the application.
 * Displays company branding, feature highlights, and calls-to-action for AI analysis.
 * Fetches and displays current user information in the navbar.
 * @function HomePage
 * @returns {React.ReactNode} The home page component
 */
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
            Your crop, <span className="highlight">
              <br />our AI
            </span>
          </h1>
          <p>
            Transform your agricultural experience with intelligent crop analysis, specialized content, and a community of innovative farmers.
          </p>
        </div>
      </section>

      <section className="analysis-box">
        <h2>Try AI Analysis</h2>
        <p>Upload a photo and get a diagnosis</p>
        <div className="upload-area">
          <p>
            📤 Drag your image here <br /> or click to select a file
          </p>
        </div>
        <a href="/ia-assistance">
          <button className="btn-primary">Start Analysis</button>
        </a>
      </section>

      <div className="style">
        <section className="features">
          <h2>Everything you need in one place</h2>
          <p>
            Free tools designed to help farmers of all levels
          </p>
          <div className="cards">
            <div className="card">
              <h3>Visual Analysis</h3>
              <p>
                Upload photos of your crops and receive detailed analysis on health, pests, and
                recommendations
              </p>
            </div>
            <div className="card">
              <h3>Educational Blog</h3>
              <p>
                Updated articles on agricultural techniques, trends, and best practices
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
        <h2>Start using your AI assistant today</h2>
        <p>
          Completely free. No complicated registrations. Just upload your photo and explain your
          situation.
        </p>
        <a href="/ia-assistance">
          <button className="btn-primary">Start Analysis</button>
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
      <Footer />
    </>
  );
}