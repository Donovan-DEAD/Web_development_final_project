"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

// Image imports
import MenuThreeBarsIcon from '../../public/images/menu_three_bars.svg';
import MenuCrossIcon from '../../public/images/menu_cross.svg';
import Favicon from '../../public/images/favicon.svg';

interface NavbarProps {
  username: string | null;
  currentPage: string;
  user: { permsLabel: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ username, currentPage, user }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isAdmin = user && user.permsLabel === 'admin';
  const isEditorOrAdmin = user && (user.permsLabel === 'admin' || user.permsLabel === 'editor');

  return (
    <AppBar position="static" className="header">
      <Toolbar component="nav" className="navbar">
        <Link href="/" passHref>
          <Box component="a" className="navbar__logo__anchor">
            <Image
              src={Favicon}
              alt="Logo"
              className="navbar__logo__img"
              width={40}
              height={40}
            />
          </Box>
        </Link>

        {/* Mobile menu icon and menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            className="navbar__menu-icon"
          >
            {anchorElNav ? (
              <Image src={MenuCrossIcon} alt="Close menu" width={30} height={30} />
            ) : (
              <Image src={MenuThreeBarsIcon} alt="Open menu" width={30} height={30} />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/" passHref>
                <Typography textAlign="center">Inicio</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/ia-assistance" passHref>
                <Typography textAlign="center">Asistente IA</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/blog-search" passHref>
                <Typography textAlign="center">Blogs</Typography>
              </Link>
            </MenuItem>
            {isAdmin && (
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/manage_perms" passHref> {/* Changed from /api/perms/users which is an API */}
                  <Typography textAlign="center">Gestionar Permisos</Typography>
                </Link>
              </MenuItem>
            )}
            {isEditorOrAdmin && (
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/create-blog" passHref>
                  <Typography textAlign="center">Crear Blog</Typography>
                </Link>
              </MenuItem>
            )}
            <hr className="navbar__mobile-separator" />
            {username ? (
              <Box className="navbar__user-info" sx={{ p: 2 }}>
                <Typography className="navbar__username" variant="body1">{username}</Typography>
                <a href="/api/logout" className="navbar__utils__logout__button">Logout</a>
              </Box>
            ) : (
              <Box className="navbar__utils__container" sx={{ flexDirection: 'column', gap: 1, p: 2 }}>
                {currentPage !== 'login' && (
                  <Link href="/login" passHref>
                    <Button className="navbar__utils__login__button" variant="contained">Iniciar sesión</Button>
                  </Link>
                )}
                {currentPage !== 'register' && (
                  <Link href="/register" passHref>
                    <Button className="navbar__utils__login__button" variant="contained">Registrarse</Button>
                  </Link>
                )}
              </Box>
            )}
          </Menu>
        </Box>

        {/* Desktop menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box component="ul" className="navbar__pages__list" sx={{ display: 'flex', gap: 3, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <li><Link href="/" passHref><Typography>Inicio</Typography></Link></li>
            <li><Link href="/ia-assistance" passHref><Typography>Asistente IA</Typography></Link></li>
            <li><Link href="/blog-search" passHref><Typography>Blogs</Typography></Link></li>
            {isAdmin && (
              <li><Link href="/manage_perms" passHref><Typography>Gestionar Permisos</Typography></Link></li>
            )}
            {isEditorOrAdmin && (
              <li><Link href="/create-blog" passHref><Typography>Crear Blog</Typography></Link></li>
            )}
          </Box>
          <Box className="navbar__utils__container" sx={{ display: 'flex', gap: 2 }}>
            {username ? (
              <Box className="navbar__user-info" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography className="navbar__username" variant="body1">{username}</Typography>
                <a href="/api/logout" className="navbar__utils__logout__button">Logout</a>
              </Box>
            ) : (
              <>
                {currentPage !== 'login' && (
                  <Link href="/login" passHref>
                    <Button className="navbar__utils__login__button" variant="contained">Iniciar sesión</Button>
                  </Link>
                )}
                {currentPage !== 'register' && (
                  <Link href="/register" passHref>
                    <Button className="navbar__utils__login__button" variant="contained">Registrarse</Button>
                  </Link>
                )}
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;