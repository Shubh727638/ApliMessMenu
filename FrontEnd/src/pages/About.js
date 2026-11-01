import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';

const REVIEWS = [
  { name: 'Pankaj', text: 'Great food and excellent service! I found my current mess through this site in five minutes.' },
  { name: 'Ravi', text: 'Love that I can see the menu before walking in. Saves so much time after college.' },
  { name: 'Aditya', text: 'Comparing monthly prices side by side helped me pick a mess that fits my budget.' },
  { name: 'Vishal', text: 'Simple, fast and useful. I check it every time I move to a new area.' },
];

const STATS = [
  { value: '3', label: 'Meals covered daily' },
  { value: '100%', label: 'Free for students' },
  { value: '24/7', label: 'Menus available online' },
];

const About = () => (
  <Layout title="About">
    <PageHero
      title="About Apli Mess Menu"
      subtitle="We help students and working professionals find good, affordable, home-style food — wherever they live."
    />

    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our story
          </Typography>
          <Typography color="text.secondary" paragraph>
            Moving to a new city for college or work means one big question every day: where do I eat? Finding a
            mess usually means walking from door to door, asking for the menu and price, and hoping the food is good.
          </Typography>
          <Typography color="text.secondary" paragraph>
            Apli Mess Menu puts all of that in one place. Browse messes near you, see what they serve for breakfast,
            lunch and dinner, compare monthly plans, and save the ones you like — all before you take a single step.
          </Typography>
          <Typography color="text.secondary">
            For mess owners, we're a free way to reach new customers and keep regulars updated with the latest menu.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            {STATS.map((s) => (
              <Card key={s.label}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h4" component="p" color="primary.main" sx={{ minWidth: 96 }}>
                    {s.value}
                  </Typography>
                  <Typography color="text.secondary">{s.label}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>

    <Box sx={{ bgcolor: '#FFF1E6', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" sx={{ mb: 4 }}>
          What our users say
        </Typography>
        <Grid container spacing={3}>
          {REVIEWS.map((r) => (
            <Grid item xs={12} sm={6} md={3} key={r.name}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Rating value={5} readOnly size="small" />
                  <Typography sx={{ my: 2 }}>“{r.text}”</Typography>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: 14 }}>{r.name[0]}</Avatar>
                    <Typography variant="subtitle2">{r.name}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Hungry already?
      </Typography>
      <Button component={RouterLink} to="/mess" variant="contained" size="large" sx={{ mt: 1 }}>
        View menus
      </Button>
    </Container>
  </Layout>
);

export default About;
