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
    shortDescription: "Technology expert",
    fullDescription: "Donovan is an expert in web development technologies, with a tireless curiosity for how the world around him works."
  },
  {
    id: 2,
    name: "Ángel Muñoz",
    role: "Developer",
    shortDescription: "UX/UI design specialist",
    fullDescription: "Ángel leads the integration of the user experience in our project, which allows our users to have the simplest possible browsing experience."
  },
  {
    id: 3,
    name: "Santiago Bonilla",
    role: "Developer",
    shortDescription: "Back-end development specialist",
    fullDescription: "Santiago, together with Donovan on the architecture, contributes to the back-end development of our application, which allows connecting the functionalities that farmers need for the diagnosis of their crops."
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
        <h1>About Us</h1>
        <div className="about-content">
          <p>
            We are a platform dedicated to revolutionizing modern agriculture through artificial intelligence
            and accessible technology.
          </p>
          <p>
            Our goal is to empower farmers of all levels with visual analysis tools,
            specialized educational content, and a community of agricultural innovators.
          </p>
          <p>
            We believe that technology should be accessible, free, and designed with real farmers in mind
            and their daily needs.
          </p>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-vision-card">
            <h2>Our Mission</h2>
            <p>
              To provide farmers around the world with accessible and free artificial intelligence tools
              that allow them to make informed decisions about their crops, increase their productivity, and ensure sustainable
              agricultural practices.
            </p>
          </div>
          <div className="mission-vision-card">
            <h2>Our Vision</h2>
            <p>
              To be the leading global platform in agricultural AI technology, where farmers of all
              socioeconomic levels have access to world-class artificial intelligence to transform their operations
              and contribute to global food security.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
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
