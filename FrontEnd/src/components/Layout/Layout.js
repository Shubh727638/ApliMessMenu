import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? `${title} · Apli Mess Menu` : 'Apli Mess Menu — Find mess menus near you';
  }, [title]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
