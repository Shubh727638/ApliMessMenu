import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import PlaceCard from '../components/PlaceCard';
import { fetchNearby, geocodePlace } from '../api';

const RADII = [
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 5000, label: '5 km' },
];

const CardSkeleton = () => (
  <Card>
    <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
      <Skeleton variant="rounded" width={48} height={48} />
      <Box sx={{ flex: 1 }}>
        <Skeleton width="70%" height={26} />
        <Skeleton width="40%" />
        <Skeleton width="55%" />
      </Box>
    </Box>
  </Card>
);

const Nearby = () => {
  const [origin, setOrigin] = useState(null); // { lat, lng, label }
  const [radius, setRadius] = useState(2000);
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('idle'); // idle | locating | loading | done | error
  const [error, setError] = useState('');
  const [places, setPlaces] = useState([]);
  const reqId = useRef(0);

  const load = useCallback(async (loc, r) => {
    const id = ++reqId.current;
    setStatus('loading');
    setError('');
    try {
      const { places: found } = await fetchNearby({ lat: loc.lat, lng: loc.lng, radius: r });
      if (id !== reqId.current) return; // a newer request superseded this one
      setPlaces(found);
      setStatus('done');
    } catch (err) {
      if (id !== reqId.current) return;
      setError(err.message || 'Could not load nearby places.');
      setStatus('error');
    }
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Your browser does not support location. Search by area instead.');
      setStatus('error');
      return;
    }
    setStatus('locating');
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'Your location' }),
      (err) => {
        setStatus('error');
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission was denied. You can search by area name instead.'
            : 'Could not get your location. Try searching by area name.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const searchArea = async (e) => {
    e?.preventDefault();
    if (area.trim().length < 2) return;
    setStatus('locating');
    setError('');
    try {
      const place = await geocodePlace(area.trim());
      setOrigin({ lat: place.lat, lng: place.lng, label: place.label.split(',').slice(0, 2).join(', ') });
    } catch (err) {
      setStatus('error');
      setError(err.status === 404 ? 'We could not find that place. Try a nearby landmark or city.' : err.message);
    }
  };

  // Reload whenever the origin or radius changes.
  useEffect(() => {
    if (origin) load(origin, radius);
  }, [origin, radius, load]);

  return (
    <Layout title="Food near me">
      <PageHero
        title="Food near you"
        subtitle="Restaurants, cafés, fast food and hotels around you — powered by open map data, free to use."
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }} alignItems="stretch">
          <Button
            variant="contained"
            size="large"
            startIcon={status === 'locating' ? <CircularProgress size={18} color="inherit" /> : <MyLocationIcon />}
            onClick={useMyLocation}
            disabled={status === 'locating'}
          >
            Use my location
          </Button>
          <Paper
            component="form"
            onSubmit={searchArea}
            sx={{ p: 0.5, display: 'flex', flex: 1, borderRadius: 999, minWidth: { sm: 280 } }}
          >
            <TextField
              fullWidth
              variant="standard"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="or search an area, e.g. Kothrud"
              inputProps={{ 'aria-label': 'Search an area' }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ pl: 1.5 }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ '& input': { py: 1 } }}
            />
            <Button type="submit" variant="text" sx={{ px: 2 }}>
              Search
            </Button>
          </Paper>
        </Stack>
      </PageHero>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {origin && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Typography color="text.secondary">
              Showing food near <b style={{ color: '#1F2937' }}>{origin.label}</b>
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={radius}
              onChange={(_, v) => v && setRadius(v)}
              aria-label="Search radius"
            >
              {RADII.map((r) => (
                <ToggleButton key={r.value} value={r.value}>
                  {r.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        )}

        {status === 'idle' && (
          <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <TravelExploreIcon sx={{ fontSize: 64, mb: 1, color: 'primary.light' }} />
            <Typography variant="h6" color="text.primary">
              Find good food around you
            </Typography>
            <Typography>Tap “Use my location” or search an area to begin.</Typography>
          </Box>
        )}

        {status === 'error' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {status === 'loading' && (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <CardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {status === 'done' && places.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <Typography variant="h6" color="text.primary">
              No places found nearby
            </Typography>
            <Typography>Try a larger radius or a different area.</Typography>
          </Box>
        )}

        {status === 'done' && places.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
              {places.length} places found
            </Typography>
            <Grid container spacing={2}>
              {places.map((place) => (
                <Grid item xs={12} sm={6} md={4} key={place.id}>
                  <PlaceCard place={place} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 5 }}>
          Place data © OpenStreetMap contributors.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Nearby;
