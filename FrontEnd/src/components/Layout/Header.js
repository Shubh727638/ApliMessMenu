import React, { useState } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/mess', label: 'Find a Mess' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/plans', label: 'Plans' },
];

export const Brand = ({ light }) => (
  <Box
    component={RouterLink}
    to="/"
    sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: light ? '#fff' : 'text.primary' }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '10px',
        bgcolor: 'primary.main',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <RestaurantMenuIcon fontSize="small" />
    </Box>
    <Typography variant="h6" component="span" sx={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
      Apli Mess Menu
    </Typography>
  </Box>
);

const AuthControls = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();
  const [anchor, setAnchor] = useState(null);

  if (isLoading) return null;
  if (!isAuthenticated) {
    return (
      <Button variant="contained" onClick={() => loginWithRedirect()} size="small">
        Log in
      </Button>
    );
  }
  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} aria-label="Account menu" size="small">
        <Avatar src={user?.picture} alt={user?.name} sx={{ width: 34, height: 34 }} />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem disabled>{user?.email || user?.name}</MenuItem>
        <MenuItem component={RouterLink} to="/plans" onClick={() => setAnchor(null)}>
          My Plan
        </MenuItem>
        <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,251,247,0.85)',
          backdropFilter: 'saturate(180%) blur(12px)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { md: 'none' }, ml: -1 }}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </IconButton>
            <Brand />
            <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 'auto' }}>
              {NAV.map((item) => (
                <Button
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  end={item.end}
                  sx={{
                    color: 'text.secondary',
                    '&.active': { color: 'primary.main', bgcolor: 'rgba(232,87,42,0.08)' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ ml: { xs: 'auto', md: 1 } }}>
              <AuthControls />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 260 } }}>
        <Box sx={{ p: 2 }}>
          <Brand />
        </Box>
        <Divider />
        <List onClick={() => setOpen(false)}>
          {NAV.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.end}
              sx={{ '&.active': { color: 'primary.main', bgcolor: 'rgba(232,87,42,0.08)' } }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
