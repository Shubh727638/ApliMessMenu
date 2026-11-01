import React from 'react';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsIcon from '@mui/icons-material/Directions';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const ICON = {
  Restaurant: RestaurantIcon,
  'Café': LocalCafeIcon,
  'Fast food': FastfoodIcon,
  'Food court': RestaurantIcon,
  Hotel: HotelIcon,
};

const formatDistance = (m) => (m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`);

const PlaceCard = ({ place }) => {
  const Icon = ICON[place.category] || RestaurantIcon;
  return (
    <Card
      component="a"
      href={place.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform .2s, box-shadow .2s',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            flexShrink: 0,
            bgcolor: 'rgba(232,87,42,.1)',
            color: 'primary.main',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {place.name}
            </Typography>
            <Chip label={formatDistance(place.distance)} size="small" color="primary" variant="outlined" sx={{ flexShrink: 0 }} />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap" sx={{ mt: 0.5, color: 'text.secondary' }}>
            <Typography variant="body2">{place.category}</Typography>
            {place.cuisine && (
              <>
                <Box component="span" sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                <Typography variant="body2">{place.cuisine}</Typography>
              </>
            )}
            {place.veg && <Chip label="Veg" size="small" sx={{ height: 20, bgcolor: 'rgba(21,128,61,.1)', color: '#15803D' }} />}
          </Stack>
          {place.address && (
            <Stack direction="row" gap={0.5} alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
              <PlaceOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" noWrap>
                {place.address}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" gap={0.5} alignItems="center" sx={{ mt: 1, color: 'primary.main' }}>
            <DirectionsIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Directions
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
