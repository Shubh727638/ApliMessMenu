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
      <ul className="navigation-mobile">
        <li >
          <Link to={'/'} >Home</Link>
        </li>
        <li >
          <Link to={'/about'} >About</Link>
        </li>
        <li >
          <Link to={'/mess'} >Mess</Link>
        </li>
        <li>
          <Link to={'/contact'} >Contact</Link>
        </li>
        <li>
          <Link to={'/plandetails'} >Plan Details</Link>
        </li>
      </ul>
    </Box>
  )
//menu Drawer end
  return (
    <>
      <Box>
      <AppBar component={"nav"} elevation={0} sx={{ bgcolor: "#f0f0f0", color: "#333", boxShadow: "none" }}>
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
                <li>
                  <Link to={'/'} >Home</Link>
                </li>
                <li >
                  <Link to={'/about'} >About</Link>
                </li>
                <li >
                  <Link to={'/mess'} >Mess</Link>
                </li>
                <li>
                  <Link to={'/contact'} >Contact</Link>
                </li>
                <li>
                  <Link to={'/plandetails'}>Plan Details</Link>
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
        <Toolbar/>
      </Box>
    </>
  )
}
export default Header
