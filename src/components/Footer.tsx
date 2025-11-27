"use client";

import React from 'react';
import Link from 'next/link';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Navegación</h4>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/ia-assistance">Asistente IA</Link></li>
            <li><Link href="/blog-search">Blogs</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Información</h4>
          <ul>
            <li><Link href="/about">Quiénes somos</Link></li>
            <li><a href="mailto:info@agriculturaai.com">info@agriculturaai.com</a></li>
            <li><a href="tel:+34912345678">+34 91 234 5678</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Síguenos</h4>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Agricultura IA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
