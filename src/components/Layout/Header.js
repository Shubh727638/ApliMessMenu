import React, { useState } from 'react'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import "../../styles/HeaderStyles.css"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';



const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  //handle menu Click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  //menu Drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        color={'black'}
        variant='h6'
        component="div"
        sx={{ flexGrow: 1, }}>
        <MenuBookIcon />
        Apli Mess Menu
      </Typography>
      <Divider />
      <ul className="navigation-mobile" style={{ marginTop: '20px', listStyle: 'none', padding: '0' }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Home</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={'/about'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>About</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={'/mess'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Menu</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={'/contact'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Contact</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={'/plandetails'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Plan Details</Link>
        </li>
      </ul>
    </Box>
  )

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "lightgray" }}>
          <Toolbar>
            <IconButton>
              <MenuOpenIcon
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{
                  mr: 2,
                  display: { sm: "none" }

                }}
                onClick={handleDrawerToggle}
              >
              </MenuOpenIcon>
            </IconButton>
            <Typography
              color={'black'}
              variant='h6'
              component="div"
              sx={{ flexGrow: 1 }}>
              <MenuBookIcon />
              Apli Mess Menu
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li style={{ marginBottom: '10px' }}>
                  <Link to={'/'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Home</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to={'/about'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>About</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to={'/mess'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Menu</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to={'/contact'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Contact</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link to={'/plandetails'} style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Plan Details</Link>
                </li>

              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
            },
          }}>
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  )
}
export default Header
