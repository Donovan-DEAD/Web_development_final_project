"use client";

import React from 'react';
import Link from 'next/link';
import '../app/styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/ia-assistance">AI Assistant</Link></li>
            <li><Link href="/blog-search">Blogs</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Information</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><a href="mailto:info@agritech.com">info@agritech.com</a></li>
            <li><a href="tel:+34912345678">+34 91 234 5678</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Agritech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
