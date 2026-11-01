import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';

const PLANS = [
  { name: 'Lunch only', price: 1800, features: ['30 lunches / month', 'Any partner mess', 'Pause anytime'] },
  { name: 'Lunch + Dinner', price: 3200, popular: true, features: ['60 meals / month', 'Weekend specials', 'Tiffin pickup', 'Pause anytime'] },
  { name: 'All meals', price: 4200, features: ['Breakfast, lunch & dinner', 'Weekend specials', 'Priority support'] },
];

const PlanCards = ({ onChoose }) => (
  <Grid container spacing={3} alignItems="stretch">
    {PLANS.map((p) => (
      <Grid item xs={12} md={4} key={p.name}>
        <Card sx={{ height: '100%', border: p.popular ? '2px solid' : '1px solid transparent', borderColor: p.popular ? 'primary.main' : 'transparent', position: 'relative' }}>
          {p.popular && <Chip label="Most popular" color="primary" size="small" sx={{ position: 'absolute', top: 16, right: 16 }} />}
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" component="h3">{p.name}</Typography>
            <Typography variant="h3" component="p" sx={{ my: 1 }}>
              ₹{p.price.toLocaleString('en-IN')}
              <Typography component="span" color="text.secondary"> /month</Typography>
            </Typography>
            <List dense sx={{ flex: 1 }}>
              {p.features.map((f) => (
                <ListItem key={f} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={f} />
                </ListItem>
              ))}
            </List>
            <Button variant={p.popular ? 'contained' : 'outlined'} fullWidth onClick={onChoose} sx={{ mt: 2 }}>
              Choose plan
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const PlanDetails = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const login = () => loginWithRedirect({ appState: { returnTo: '/plans' } });

  return (
    <Layout title="Meal Plans">
      <PageHero title="Meal plans" subtitle="Simple monthly plans. No hidden charges, pause or cancel anytime." />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {isLoading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : isAuthenticated ? (
          <>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Avatar src={user?.picture} alt={user?.name} sx={{ width: 56, height: 56 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6">Welcome, {user?.given_name || user?.name}!</Typography>
                  <Typography color="text.secondary" sx={{ wordBreak: 'break-word' }}>{user?.email}</Typography>
                </Box>
                <Chip label="No active plan" variant="outlined" />
              </CardContent>
            </Card>
            <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
              Choose a plan
            </Typography>
            <PlanCards onChoose={() => navigate('/contact')} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Online payments are coming soon. Choose a plan and our team will get in touch to activate it.
            </Typography>
          </>
        ) : (
          <>
            <Card sx={{ mb: 4, bgcolor: '#FFF1E6', boxShadow: 'none' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ sm: 'center' }}>
                  <LockOutlinedIcon color="primary" />
                  <Typography sx={{ flex: 1 }}>Log in to view your plan, subscription status and profile.</Typography>
                  <Button variant="contained" onClick={login}>Log in / Sign up</Button>
                </Stack>
              </CardContent>
            </Card>
            <PlanCards onChoose={login} />
          </>
        )}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button component={RouterLink} to="/mess">Browse messes first</Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default PlanDetails;
