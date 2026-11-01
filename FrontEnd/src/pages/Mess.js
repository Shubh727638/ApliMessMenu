import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import MessCard from '../components/Mess/MessCard';
import useFavorites from '../hooks/useFavorites';
import { fetchMesses } from '../api';
import heroImage from '../Images/mess-hero.jpg';

const SORTS = {
  rating: { label: 'Top rated', fn: (a, b) => (b.rating || 0) - (a.rating || 0) },
  priceLow: { label: 'Price: low to high', fn: (a, b) => (a.monthlyPrice || 0) - (b.monthlyPrice || 0) },
  priceHigh: { label: 'Price: high to low', fn: (a, b) => (b.monthlyPrice || 0) - (a.monthlyPrice || 0) },
};

const CardSkeleton = () => (
  <Card>
    <Skeleton variant="rectangular" height={160} />
    <Box sx={{ p: 2 }}>
      <Skeleton width="70%" height={28} />
      <Skeleton width="40%" />
      <Skeleton width="90%" />
      <Skeleton width="60%" />
    </Box>
  </Card>
);

const Mess = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const type = params.get('type') || '';
  const saved = params.get('saved') === '1';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'rating';

  const [input, setInput] = useState(q);
  const [state, setState] = useState({ loading: true, error: null, data: [] });
  const [reload, setReload] = useState(0);
  const { favorites, isFavorite, toggle } = useFavorites();

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  // Debounce typing into the URL ?q= param.
  useEffect(() => {
    const t = setTimeout(() => {
      if (input.trim() !== q) update('q', input.trim());
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchMesses({ q, type }, ctrl.signal)
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ loading: false, error: err, data: [] });
      });
    return () => ctrl.abort();
  }, [q, type, reload]);

  const results = useMemo(() => {
    let list = state.data;
    if (saved) list = list.filter((m) => favorites.includes(m.slug || m._id));
    return [...list].sort(SORTS[sort].fn);
  }, [state.data, saved, favorites, sort]);

  return (
    <Layout title="Find a Mess">
      <PageHero
        title="Find a mess near you"
        subtitle="Search by mess name, area or your favourite dish — poha, misal, fish thali and more."
        image={heroImage}
      >
        <Paper
          component="form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            update('q', input.trim());
          }}
          sx={{ mt: 3, p: 0.75, display: 'flex', maxWidth: 640, borderRadius: 999 }}
        >
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try “Kothrud”, “paneer” or “Malvani”"
            inputProps={{ 'aria-label': 'Search messes' }}
            variant="standard"
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
          <Button type="submit" variant="contained" sx={{ px: 3 }}>
            Search
          </Button>
        </Paper>
      </PageHero>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={type}
              onChange={(_, v) => v !== null && update('type', v)}
              aria-label="Food type"
            >
              <ToggleButton value="">All</ToggleButton>
              <ToggleButton value="veg">Pure veg</ToggleButton>
              <ToggleButton value="non-veg">Non-veg</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButton
              size="small"
              value="saved"
              selected={saved}
              onChange={() => update('saved', saved ? '' : '1')}
            >
              <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} /> Saved ({favorites.length})
            </ToggleButton>
          </Stack>
          <TextField
            select
            size="small"
            label="Sort by"
            value={sort}
            onChange={(e) => update('sort', e.target.value === 'rating' ? '' : e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {Object.entries(SORTS).map(([key, s]) => (
              <MenuItem key={key} value={key}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {state.error ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => setReload((n) => n + 1)}>
                Retry
              </Button>
            }
          >
            We couldn't load messes right now. Please check your connection and try again.
          </Alert>
        ) : state.loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <CardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : results.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <SearchOffIcon sx={{ fontSize: 56, mb: 1 }} />
            <Typography variant="h6" color="text.primary">
              {saved ? 'No saved messes yet' : 'No messes match your search'}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {saved ? 'Tap the heart on any mess to save it here.' : 'Try a different dish, area or filter.'}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setInput('');
                setParams({}, { replace: true });
              }}
            >
              Clear filters
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
              {results.length} {results.length === 1 ? 'mess' : 'messes'} found
              {q && <> for “{q}”</>}
            </Typography>
            <Grid container spacing={3}>
              {results.map((mess) => (
                <Grid item xs={12} sm={6} md={4} key={mess.slug || mess._id}>
                  <MessCard
                    mess={mess}
                    isFavorite={isFavorite(mess.slug || mess._id)}
                    onToggleFavorite={toggle}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Mess;
