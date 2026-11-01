import React from 'react';
import { Box, Container, Typography } from '@mui/material';

// Compact page header with optional background photo.
const PageHero = ({ title, subtitle, image, children }) => (
  <Box
    sx={{
      position: 'relative',
      color: image ? '#fff' : 'text.primary',
      py: { xs: 6, md: 9 },
      background: image
        ? `linear-gradient(180deg, rgba(20,12,6,.55), rgba(20,12,6,.75)), url(${image}) center/cover`
        : 'linear-gradient(180deg, #FFF1E6, #FFFBF7)',
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" component="p" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 640 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Container>
  </Box>
);

export default PageHero;
