import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Brand } from './Header';
import { CONTACT } from '../../config';

const linkSx = { color: 'grey.400', textDecoration: 'none', '&:hover': { color: '#fff' } };

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#1F1B18', color: 'grey.300', pt: 6, pb: 4, mt: 'auto' }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Brand light />
          <Typography variant="body2" sx={{ mt: 2, color: 'grey.400', maxWidth: 360 }}>
            Find home-style mess food near you. Compare daily menus, prices and timings — all in one place.
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5 }}>
            Explore
          </Typography>
          <Stack spacing={1}>
            <Link component={RouterLink} to="/mess" sx={linkSx}>Find a Mess</Link>
            <Link component={RouterLink} to="/nearby" sx={linkSx}>Food near me</Link>
            <Link component={RouterLink} to="/about" sx={linkSx}>About us</Link>
            <Link component={RouterLink} to="/plans" sx={linkSx}>Meal plans</Link>
            <Link component={RouterLink} to="/contact" sx={linkSx}>List your mess</Link>
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5 }}>
            Get in touch
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Instagram" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" sx={{ color: 'grey.300' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="WhatsApp" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" sx={{ color: 'grey.300' }}>
              <WhatsAppIcon />
            </IconButton>
            <IconButton aria-label="Email" href={`mailto:${CONTACT.email}`} sx={{ color: 'grey.300' }}>
              <MailOutlineIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)', color: 'grey.500' }}>
        © {new Date().getFullYear()} Apli Mess Menu. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
