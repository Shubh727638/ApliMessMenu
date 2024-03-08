import React, { useState } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
//import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "../../styles/HeaderStyles.css";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Import RestaurantMenuIcon

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // Get the current location

  // handle menu Click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // menu Drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography color={'black'} variant='h6' component="div" sx={{ flexGrow: 1 }}>
        <RestaurantMenuIcon />
        Apli Mess Menu
      </Typography>
      <Divider />
      <ul className="navigation-mobile">
        <li>
          <Link to={'/'} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to={'/about'} className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        </li>
        <li>
          <Link to={'/mess'} className={location.pathname === '/mess' ? 'active' : ''}>Mess</Link>
        </li>
        <li>
          <Link to={'/contact'} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
        <li>
          <Link to={'/plandetails'} className={location.pathname === '/plandetails' ? 'active' : ''}>Plan Details</Link>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} elevation={0} sx={{ bgcolor: "#f0f0f0", color: "#333", boxShadow: "none" }}>
          <Toolbar>
            <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
              <MenuOpenIcon color="inherit" aria-label="open drawer" edge="start" />
            </IconButton>
            <Typography color={'black'} variant='h6' component="div" sx={{ flexGrow: 1 }}>
              <RestaurantMenuIcon />
              Apli Mess Menu
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <Link to={'/'} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                </li>
                <li>
                  <Link to={'/about'} className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                </li>
                <li>
                  <Link to={'/mess'} className={location.pathname === '/mess' ? 'active' : ''}>Mess</Link>
                </li>
                <li>
                  <Link to={'/contact'} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                </li>
                <li>
                  <Link to={'/plandetails'} className={location.pathname === '/plandetails' ? 'active' : ''}>Plan Details</Link>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" } }}>
            {drawer}
          </Drawer>
        </Box>
        <Toolbar />
      </Box>
    </>
  );
};

export default Header;
