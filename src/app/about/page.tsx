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
    name: "Carlos Mendez",
    role: "CEO & Fundador",
    shortDescription: "Experto en tecnología agrícola",
    fullDescription: "Carlos es un empresario visionario con más de 15 años de experiencia en el sector agrícola y desarrollo de software. Su pasión por combinar IA con agricultura lo llevó a fundar nuestra plataforma. Graduado del Instituto Tecnológico Nacional con especialidad en sistemas computacionales."
  },
  {
    id: 2,
    name: "María González",
    role: "Directora de Producto",
    shortDescription: "Especialista en diseño UX/UI",
    fullDescription: "María lidera la estrategia de producto con su profundo conocimiento en experiencia del usuario. Con más de 10 años en diseño de interfaces, ha trabajado con empresas Fortune 500. Su enfoque centrado en el usuario garantiza que nuestras herramientas sean intuitivas y accesibles."
  },
  {
    id: 3,
    name: "Dr. Jorge Ruiz",
    role: "Asesor Agrónomo",
    shortDescription: "Ingeniero agrónomo con especialidad en plagas",
    fullDescription: "Dr. Ruiz aporta expertise técnico en agronomía con una maestría en fitopatología. Ha trabajado en investigación agrícola durante 20 años y asesora a nuestro equipo de IA para asegurar que los diagnósticos sean precisos y útiles para agricultores reales."
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
            Nuestro objetivo es empoderar a agricultores de todos los niveles con herramientas de análisis visual,
            contenido educativo especializado y una comunidad de innovadores agrícolas.
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
