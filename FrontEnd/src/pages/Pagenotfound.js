import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import Layout from '../components/Layout/Layout';

const Pagenotfound = () => (
  <Layout title="Page not found">
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <NoMealsIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Looks like this plate is empty. The page you're looking for may have moved or no longer exists.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button component={RouterLink} to="/" variant="contained">
          Go home
        </Button>
        <Button component={RouterLink} to="/mess" variant="outlined">
          Find a mess
        </Button>
      </Stack>
    </Container>
  </Layout>
);

export default Pagenotfound;
