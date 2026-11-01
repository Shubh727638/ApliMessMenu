import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DirectionsIcon from '@mui/icons-material/Directions';
import Layout from '../components/Layout/Layout';
import ShareButton from '../components/ShareButton';
import MessArt from '../components/Mess/MessArt';
import { VegBadge, formatINR } from '../components/Mess/MessCard';
import useFavorites from '../hooks/useFavorites';
import { fetchMess } from '../api';

const MEALS = [
  { key: 'breakfast', label: 'Breakfast', Icon: FreeBreakfastOutlinedIcon },
  { key: 'lunch', label: 'Lunch', Icon: LunchDiningOutlinedIcon },
  { key: 'dinner', label: 'Dinner', Icon: DinnerDiningOutlinedIcon },
];

const MessDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({ loading: true, error: null, mess: null });
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const ctrl = new AbortController();
    setState({ loading: true, error: null, mess: null });
    fetchMess(id, ctrl.signal)
      .then((mess) => setState({ loading: false, error: null, mess }))
      .catch((error) => error.name !== 'AbortError' && setState({ loading: false, error, mess: null }));
    return () => ctrl.abort();
  }, [id]);

  const { loading, error, mess } = state;

  if (loading) {
    return (
      <Layout title="Loading…">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton variant="rounded" height={260} />
          <Skeleton width="50%" height={48} sx={{ mt: 2 }} />
          <Skeleton width="30%" />
        </Container>
      </Layout>
    );
  }

  if (error || !mess) {
    return (
      <Layout title="Mess not found">
        <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
          <Alert severity={error?.status === 404 ? 'info' : 'error'} sx={{ mb: 3, textAlign: 'left' }}>
            {error?.status === 404
              ? "We couldn't find that mess. It may have been removed."
              : 'Something went wrong while loading this mess. Please try again.'}
          </Alert>
          <Button component={RouterLink} to="/mess" variant="contained">
            Browse all messes
          </Button>
        </Container>
      </Layout>
    );
  }

  const favId = mess.slug || mess._id;
  const saved = isFavorite(favId);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${mess.name}, ${mess.address || mess.area}`
  )}`;

  return (
    <Layout title={mess.name}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/mess" underline="hover" color="inherit">
            Messes
          </Link>
          <Typography color="text.primary">{mess.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 3 }}>
          <MessArt mess={mess} height={240} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
              <Typography variant="h3" component="h1">
                {mess.name}
              </Typography>
              <VegBadge type={mess.type} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
              <Rating value={mess.rating || 0} precision={0.1} readOnly />
              <Typography color="text.secondary">
                {mess.rating?.toFixed(1)} · {mess.reviewCount || 0} reviews
              </Typography>
            </Stack>
            {mess.description && (
              <Typography sx={{ mt: 2, fontSize: '1.05rem' }} color="text.secondary">
                {mess.description}
              </Typography>
            )}
            {mess.tags?.length > 0 && (
              <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 2 }}>
                {mess.tags.map((t) => (
                  <Chip key={t} label={t} variant="outlined" size="small" />
                ))}
              </Stack>
            )}

            <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 2 }}>
              Menu
            </Typography>
            <Grid container spacing={2}>
              {MEALS.filter((m) => mess.menu?.[m.key]?.length).map(({ key, label, Icon }) => (
                <Grid item xs={12} sm={4} key={key}>
                  <Card variant="outlined" sx={{ height: '100%', boxShadow: 'none' }}>
                    <CardContent>
                      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1, color: 'primary.main' }}>
                        <Icon />
                        <Typography variant="h6" component="h3" color="text.primary">
                          {label}
                        </Typography>
                      </Stack>
                      <List dense disablePadding>
                        {mess.menu[key].map((item) => (
                          <ListItem key={item} disableGutters>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.light' }} />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="p">
                  {formatINR(mess.monthlyPrice)}
                  <Typography component="span" color="text.secondary"> /month</Typography>
                </Typography>
                <Typography color="text.secondary">or {formatINR(mess.mealPrice)} per meal</Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1.5}>
                  {mess.address && (
                    <Stack direction="row" gap={1.5}>
                      <PlaceOutlinedIcon color="action" />
                      <Typography variant="body2">{mess.address}</Typography>
                    </Stack>
                  )}
                  {mess.timings && (
                    <Stack direction="row" gap={1.5}>
                      <AccessTimeIcon color="action" />
                      <Box>
                        {mess.timings.lunch && <Typography variant="body2">Lunch: {mess.timings.lunch}</Typography>}
                        {mess.timings.dinner && <Typography variant="body2">Dinner: {mess.timings.dinner}</Typography>}
                      </Box>
                    </Stack>
                  )}
                </Stack>
                <Stack spacing={1} sx={{ mt: 3 }}>
                  {mess.phone && (
                    <Button variant="contained" size="large" startIcon={<CallIcon />} href={`tel:${mess.phone}`}>
                      Call mess
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<DirectionsIcon />}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions
                  </Button>
                  <Button
                    variant="text"
                    startIcon={saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={() => toggle(favId)}
                    aria-pressed={saved}
                  >
                    {saved ? 'Saved' : 'Save for later'}
                  </Button>
                  <ShareButton
                    variant="text"
                    label="Share this mess"
                    title={`${mess.name} on Apli Mess Menu`}
                    text={`Check out ${mess.name} (${mess.area}) on Apli Mess Menu`}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default MessDetails;
