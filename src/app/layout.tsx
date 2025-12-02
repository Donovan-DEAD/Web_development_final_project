/**
 * @fileoverview Root layout component for the entire application.
 * Configures global styles, fonts, metadata, and providers for all pages.
 * This is the entry point for the Next.js app directory.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "./styles/blog_search.css";
import "./styles/blogpost.css";
import "./styles/create_blog.css";
import "./styles/ia_assistance.css";
import "./styles/ia_response.css";
import "./styles/login.css";
import "./styles/main_page.css";
import "./styles/manage_perms.css";
import "./styles/navbar.css";
import "./styles/register.css";
import "./styles/toast.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agritech",
  description: "Agritech - Smart solutions for modern agriculture",
};

/**
 * RootLayout component - Main layout wrapper for the entire application.
 * Configures fonts, imports global styles, and wraps content with providers.
 * @function RootLayout
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child pages and components
 * @returns {React.ReactNode} The HTML structure with providers and global styles
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
