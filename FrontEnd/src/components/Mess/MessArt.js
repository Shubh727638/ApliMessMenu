import React from 'react';
import { Box } from '@mui/material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Pleasant generated cover used when a mess has no photo.
const PALETTES = [
  ['#FDBA74', '#E8572A'],
  ['#FCD34D', '#D97706'],
  ['#86EFAC', '#15803D'],
  ['#FCA5A5', '#B91C1C'],
  ['#C4B5FD', '#6D28D9'],
  ['#93C5FD', '#1D4ED8'],
];

const hash = (s = '') => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const MessArt = ({ mess, height = 180, sx }) => {
  if (mess?.image) {
    return (
      <Box
        component="img"
        src={mess.image}
        alt={mess.name}
        loading="lazy"
        sx={{ width: '100%', height, objectFit: 'cover', ...sx }}
      />
    );
  }
  const [from, to] = PALETTES[hash(mess?.slug || mess?.name) % PALETTES.length];
  const Icon = mess?.type === 'non-veg' ? RestaurantIcon : RamenDiningIcon;
  const initials = (mess?.name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <Box
      role="img"
      aria-label={mess?.name}
      sx={{
        height,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${from}, ${to})`,
        color: 'rgba(255,255,255,0.95)',
        display: 'grid',
        placeItems: 'center',
        ...sx,
      }}
    >
      <Icon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: height * 0.9, opacity: 0.18 }} />
      <Box sx={{ fontSize: height * 0.3, fontWeight: 800, letterSpacing: '-0.04em' }}>{initials}</Box>
    </Box>
  );
};

export default MessArt;
