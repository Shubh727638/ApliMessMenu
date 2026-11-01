const express = require('express');
const { nearbyFood, geocode } = require('../services/osm');

const router = express.Router();

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// GET /api/nearby?lat=&lng=&radius=
router.get('/nearby', async (req, res, next) => {
  const lat = num(req.query.lat);
  const lng = num(req.query.lng);
  let radius = num(req.query.radius) || 1500;
  if (lat === null || lng === null || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return res.status(400).json({ error: 'Valid lat and lng are required' });
  }
  radius = Math.min(Math.max(radius, 200), 5000);
  try {
    const places = await nearbyFood({ lat, lng, radius });
    res.json({ places, attribution: '© OpenStreetMap contributors' });
  } catch (err) {
    err.userMessage = 'Could not load nearby places right now. Please try again in a moment.';
    next(err);
  }
});

// GET /api/geocode?q=Kothrud
router.get('/geocode', async (req, res, next) => {
  const q = String(req.query.q || '').trim();
  if (q.length < 2) return res.status(400).json({ error: 'Please enter a place to search' });
  try {
    const place = await geocode(q);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    err.userMessage = 'Could not look up that place right now. Please try again.';
    next(err);
  }
});

module.exports = router;
