import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Layout from '../components/Layout/Layout';
import MessCard from '../components/Mess/MessCard';
import useFavorites from '../hooks/useFavorites';
import { fetchMesses } from '../api';
import Banner from '../Images/banner.jpg';

const FEATURES = [
  { Icon: SearchIcon, title: 'Search by dish or area', text: 'Craving misal or fish thali? Find which mess serves it near you.' },
  { Icon: CurrencyRupeeIcon, title: 'Compare prices', text: 'See monthly plans and per-meal prices side by side, no surprises.' },
  { Icon: StarRoundedIcon, title: 'Ratings you can trust', text: 'Pick the best mess using ratings from students and professionals.' },
  { Icon: FavoriteRoundedIcon, title: 'Save favourites', text: 'Shortlist the messes you like and come back to them any time.' },
];

const POPULAR = ['Poha', 'Misal', 'Paneer', 'Fish thali', 'Kothrud', 'Wakad'];

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [top, setTop] = useState([]);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const ctrl = new AbortController();
    fetchMesses({}, ctrl.signal)
      .then((data) => setTop(data.slice(0, 3)))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const go = (q) => navigate(q ? `/mess?q=${encodeURIComponent(q)}` : '/mess');

  return (
    <Layout>
      {/* Hero */}
      <Box
        sx={{
          color: '#fff',
          background: `linear-gradient(90deg, rgba(20,12,6,.85) 0%, rgba(20,12,6,.55) 55%, rgba(20,12,6,.2) 100%), url(${Banner}) center/cover`,
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 640 }}>
            <Chip label="Ghar jaisa khana, near you" sx={{ bgcolor: 'rgba(255,255,255,.15)', color: '#fff', mb: 2 }} />
            <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
              Discover your next <Box component="span" sx={{ color: 'primary.light' }}>delicious meal</Box>
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 400, opacity: 0.9, mb: 4 }}>
              Browse menus, prices and timings of messes and tiffin services around you — in seconds.
            </Typography>
            <Paper
              component="form"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                go(query.trim());
              }}
              sx={{ p: 0.75, display: 'flex', borderRadius: 999 }}
            >
              <TextField
                fullWidth
                variant="standard"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a dish, mess or area"
                inputProps={{ 'aria-label': 'Search a dish, mess or area' }}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ pl: 1.5 }}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& input': { py: 1.25 } }}
              />
              <Button type="submit" variant="contained" sx={{ px: { xs: 2, sm: 4 } }}>
                Find
              </Button>
            </Paper>
            <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.8, alignSelf: 'center' }}>
                Popular:
              </Typography>
              {POPULAR.map((p) => (
                <Chip
                  key={p}
                  label={p}
                  size="small"
                  onClick={() => go(p)}
                  sx={{ bgcolor: 'rgba(255,255,255,.15)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,.25)' } }}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Everything you need to pick the right mess
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mb: 5, maxWidth: 560, mx: 'auto' }}>
          No more walking door to door asking “aaj menu kya hai?”
        </Typography>
        <Grid container spacing={3}>
          {FEATURES.map(({ Icon, title, text }) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: 'rgba(232,87,42,.1)', color: 'primary.main', display: 'grid', placeItems: 'center', mb: 2 }}>
                    <Icon />
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top rated */}
      {top.length > 0 && (
        <Box sx={{ bgcolor: '#FFF1E6', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 4 }} gap={2}>
              <Box>
                <Typography variant="h4" component="h2">
                  Top rated messes
                </Typography>
                <Typography color="text.secondary">Loved by students and working professionals.</Typography>
              </Box>
              <Button component={RouterLink} to="/mess" endIcon={<ArrowForwardIcon />} sx={{ flexShrink: 0 }}>
                View all
              </Button>
            </Stack>
            <Grid container spacing={3}>
              {top.map((mess) => (
                <Grid item xs={12} sm={6} md={4} key={mess.slug || mess._id}>
                  <MessCard mess={mess} isFavorite={isFavorite(mess.slug || mess._id)} onToggleFavorite={toggle} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* CTA for owners */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Run a mess or tiffin service?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          List your mess on Apli Mess Menu for free and reach hundreds of hungry students nearby.
        </Typography>
        <Button component={RouterLink} to="/contact" variant="contained" size="large">
          List your mess
        </Button>
      </Container>
    </Layout>
  );
};

export default Home;
