import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Chip, IconButton, Rating, Stack, Tooltip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MessArt from './MessArt';
import ShareButton from '../ShareButton';

export const VegBadge = ({ type }) => {
  const veg = type !== 'non-veg';
  return (
    <Chip
      size="small"
      label={veg ? 'Pure Veg' : 'Veg & Non-veg'}
      sx={{
        bgcolor: veg ? 'rgba(21,128,61,0.1)' : 'rgba(185,28,28,0.1)',
        color: veg ? '#15803D' : '#B91C1C',
      }}
    />
  );
};

export const formatINR = (n) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—';

const MessCard = ({ mess, isFavorite, onToggleFavorite }) => {
  const id = mess.slug || mess._id;
  const preview = [...(mess.menu?.lunch || [])].slice(0, 4).join(' · ');

  return (
    <Card sx={{ height: '100%', position: 'relative', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
        <ShareButton
          variant="icon"
          size="small"
          title={`${mess.name} on Apli Mess Menu`}
          text={`Check out ${mess.name} (${mess.area}) on Apli Mess Menu`}
          url={`${window.location.origin}/mess/${id}`}
          sx={{ bgcolor: 'rgba(255,255,255,0.92)', '&:hover': { bgcolor: '#fff' } }}
        />
        <Tooltip title={isFavorite ? 'Remove from saved' : 'Save'}>
          <IconButton
            onClick={() => onToggleFavorite(id)}
            aria-label={isFavorite ? `Remove ${mess.name} from saved` : `Save ${mess.name}`}
            aria-pressed={isFavorite}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.92)', '&:hover': { bgcolor: '#fff' } }}
          >
            {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
      <CardActionArea component={RouterLink} to={`/mess/${id}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <MessArt mess={mess} height={160} />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
            <Typography variant="h6" component="h3" sx={{ lineHeight: 1.25 }}>
              {mess.name}
            </Typography>
            <VegBadge type={mess.type} />
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: 'text.secondary' }}>
            <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{mess.area}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Rating value={mess.rating || 0} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {mess.rating?.toFixed(1)} ({mess.reviewCount || 0})
            </Typography>
          </Stack>
          {preview && (
            <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              Lunch: {preview}
            </Typography>
          )}
          <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {formatINR(mess.monthlyPrice)}
              <Typography component="span" variant="body2" color="text.secondary"> /month</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatINR(mess.mealPrice)} /meal
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MessCard;
