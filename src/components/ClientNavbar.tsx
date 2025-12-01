"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import '../app/styles/clientNavbar.css';

// Image imports
import MenuThreeBarsIcon from '../../public/images/menu_three_bars.svg';
import MenuCrossIcon from '../../public/images/menu_cross.svg';
import Favicon from '../../public/images/favicon.svg';

interface ClientNavbarProps {
  username: string | null;
  currentPage: string | undefined;
  user: { permsLabel: string } | null;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ username, currentPage, user }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted && user && user.permsLabel === 'admin';
  const isEditorOrAdmin = mounted && user && (user.permsLabel === 'admin' || user.permsLabel === 'editor');

  return (
    <AppBar position="static" className="navbar-header">
      <Toolbar component="nav" className="navbar-toolbar">
        {/* Logo */}
        <Link href="/" passHref>
          <Box component="div" className="navbar-logo-anchor">
            <Image
              src={Favicon}
              alt="Logo"
              className="navbar-logo-img"
              width={40}
              height={40}
            />
          </Box>
        </Link>

        {/* Mobile Hamburger Menu Icon */}
        <Box className="navbar-mobile-menu-icon">
          <IconButton
            size="large"
            aria-label="Open navigation menu"
            onClick={handleOpenDrawer}
            className="navbar-menu-icon-button"
          >
            <MenuIcon className="navbar-menu-icon" />
          </IconButton>
        </Box>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={handleCloseDrawer}
          classes={{ paper: 'navbar-drawer-paper' }}
        >
          <Box className="navbar-drawer-header">
            <Typography variant="h6" className="navbar-drawer-header-title">
              Menu
            </Typography>
            <IconButton
              onClick={handleCloseDrawer}
              className="navbar-drawer-close-button"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider className="navbar-drawer-divider" />

          <Box className="navbar-drawer-links-container">
            {/* Navigation Links */}
            <Link href="/" passHref onClick={handleCloseDrawer}>
              <Typography className="navbar-drawer-link">
                Home
              </Typography>
            </Link>
            <Link href="/ia-assistance" passHref onClick={handleCloseDrawer}>
              <Typography className="navbar-drawer-link">
                AI Assistant
              </Typography>
            </Link>
            <Link href="/blog-search" passHref onClick={handleCloseDrawer}>
              <Typography className="navbar-drawer-link">
                Blogs
              </Typography>
            </Link>
            <Link href="/about" passHref onClick={handleCloseDrawer}>
              <Typography className="navbar-drawer-link">
                About Us
              </Typography>
            </Link>
            {isAdmin && (
              <Link href="/manage_perms" passHref onClick={handleCloseDrawer}>
                <Typography className="navbar-drawer-link">
                  Manage Permissions
                </Typography>
              </Link>
            )}
            {isEditorOrAdmin && (
              <Link href="/create-blog" passHref onClick={handleCloseDrawer}>
                <Typography className="navbar-drawer-link">
                  Create Blog
                </Typography>
              </Link>
            )}
          </Box>

          <Divider className="navbar-drawer-divider" />

          {/* User Info Section */}
          <Box className="navbar-drawer-user-section">
            {username ? (
              <Box>
                <Typography className="navbar-drawer-username">
                  {username}
                </Typography>
                <Button 
                  onClick={() => {
                    handleLogout();
                    handleCloseDrawer();
                  }}
                  variant="outlined"
                  className="navbar-drawer-logout-button"
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box className="navbar-drawer-auth-container">
                {currentPage !== 'login' && (
                  <Link href="/login" passHref onClick={handleCloseDrawer} style={{ width: '100%' }}>
                    <Button 
                      variant="contained"
                      className="navbar-drawer-login-button"
                    >
                      Login
                    </Button>
                  </Link>
                )}
                {currentPage !== 'register' && (
                  <Link href="/register" passHref onClick={handleCloseDrawer} style={{ width: '100%' }}>
                    <Button 
                      variant="contained"
                      className="navbar-drawer-register-button"
                    >
                      Sign Up
                    </Button>
                  </Link>
                )}
              </Box>
            )}
          </Box>
        </Drawer>

        {/* Desktop Navigation Menu */}
        <Box className="navbar-desktop-menu">
          <Link href="/" passHref>
            <Typography className="navbar-desktop-link">
              Home
            </Typography>
          </Link>
          <Link href="/ia-assistance" passHref>
            <Typography className="navbar-desktop-link">
              AI Assistant
            </Typography>
          </Link>
          <Link href="/blog-search" passHref>
            <Typography className="navbar-desktop-link">
              Blogs
            </Typography>
          </Link>
          <Link href="/about" passHref>
            <Typography className="navbar-desktop-link">
              About Us
            </Typography>
          </Link>
          {isAdmin && (
            <Link href="/manage_perms" passHref>
              <Typography className="navbar-desktop-link">
                Manage Permissions
              </Typography>
            </Link>
          )}
          {isEditorOrAdmin && (
            <Link href="/create-blog" passHref>
              <Typography className="navbar-desktop-link">
                Create Blog
              </Typography>
            </Link>
          )}
        </Box>

        {/* Desktop User Section */}
        <Box className="navbar-desktop-user-section">
          {username ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography className="navbar-desktop-username">{username}</Typography>
              <Button 
                onClick={handleLogout} 
                variant="outlined"
                className="navbar-desktop-logout-button"
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              {currentPage !== 'login' && (
                <Link href="/login" passHref>
                  <Button variant="contained" className="navbar-desktop-login-button">
                    Login
                  </Button>
                </Link>
              )}
              {currentPage !== 'register' && (
                <Link href="/register" passHref>
                  <Button variant="contained" className="navbar-desktop-register-button">
                    Sign Up
                  </Button>
                </Link>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientNavbar;