"use client";

import React, { useState, useEffect } from 'react';
import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/about.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Donovan Aguilar",
    role: "Team Leader",
    shortDescription: "Experto en tecnología",
    fullDescription: "Donovan es un experto en tecnologías de desarrollo web, con incansable curiosidad por como funciona el mundo que lo rodea. Lidera con la arquitectura del proyecto y la delegación de tareas para todo el equipo."
  },
  {
    id: 2,
    name: "Ángel Muñoz",
    role: "Developer",
    shortDescription: "Especialista en diseño UX/UI",
    fullDescription: "Ángel lidera la integración de la experiencia de usuario en nuestro proyecto, por medio del cual se le permite a nuestros usuarios tener la experiencia de navegación más sencilla posible."
  },
  {
    id: 3,
    name: "Santiago Bonilla",
    role: "Developer",
    shortDescription: "Especialista en desarrollo back-end",
    fullDescription: "Santiago, junto a Donovan en la arquitectura, aporta la parte del desarrollo del back-end de nuestra aplicación, que permite conectar las funcionalidades que los agricultores necesitan para el diagnóstico de sus cultivos."
  }
];

export default function AboutPage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  const handleExpandClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            Nuestro objetivo con este proyecto es empoderar y ayudar a los agricultores de todos los niveles y experiencias de vida
            a tener análisis rápidos y confiables de la condición de sus cultivos. Esto, tomando en base los objetivos de desarrollo
            sustentables de las Naciones Unidas.
          </p>
          <p>
            Creemos que la tecnología debe ser accesible, gratuita y diseñada pensando en los agricultores reales
            y sus necesidades cotidianas.
          </p>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-vision-card">
            <h2>Nuestra Misión</h2>
            <p>
              Proporcionan agricultores de todo el mundo con herramientas de inteligencia artificial accesibles y gratuitas
              que les permitan tomar decisiones informadas sobre sus cultivos, aumentar su productividad y asegurar prácticas
              agrícolas sostenibles.
            </p>
          </div>
          <div className="mission-vision-card">
            <h2>Nuestra Visión</h2>
            <p>
              Ser la plataforma líder global en tecnología agrícola de IA, donde agricultores de todos los niveles
              socioeconómicos tengan acceso a inteligencia artificial de clase mundial para transformar sus operaciones
              y contribuir a la seguridad alimentaria mundial.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Conoce a Nuestro Equipo</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <Card key={member.id} className="team-card">
              <CardHeader
                title={member.name}
                subheader={member.role}
                className="team-card-header"
              />
              <CardContent className="team-card-content">
                <p className="team-card-short">{member.shortDescription}</p>
              </CardContent>
              <Collapse in={expandedId === member.id} timeout="auto" unmountOnExit>
                <CardContent className="team-card-expanded">
                  <p>{member.fullDescription}</p>
                </CardContent>
              </Collapse>
              <div className="team-card-footer">
                <IconButton
                  onClick={() => handleExpandClick(member.id)}
                  className="expand-button"
                  aria-expanded={expandedId === member.id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon className={expandedId === member.id ? 'expanded' : ''} />
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
