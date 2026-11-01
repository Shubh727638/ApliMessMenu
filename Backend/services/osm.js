// Nearby food search backed by OpenStreetMap — free, no API key.
// Overpass API provides the places; Nominatim turns a place name into coordinates.
// OSM data is © OpenStreetMap contributors (ODbL); attribution is shown in the UI.

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];
const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'ApliMessMenu/1.0 (+https://github.com/Shubh727638/ApliMessMenu)';

const CATEGORY = {
  restaurant: 'Restaurant',
  cafe: 'Café',
  fast_food: 'Fast food',
  food_court: 'Food court',
};

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000; // metres
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const prettify = (s) =>
  s
    .split(';')
    .map((t) =>
      t
        .trim()
        .split('_')
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(' ')
    )
    .filter(Boolean)
    .join(', ');

// Pure, testable: normalise an Overpass response into ranked place cards.
function parseOverpass(data, lat, lng, limit = 48) {
  const seen = new Set();
  const out = [];
  for (const el of data.elements || []) {
    const t = el.tags || {};
    if (!t.name) continue;
    const plat = el.lat ?? el.center?.lat;
    const plng = el.lon ?? el.center?.lon;
    if (plat == null || plng == null) continue;
    const dedupe = `${t.name}@${plat.toFixed(4)},${plng.toFixed(4)}`;
    if (seen.has(dedupe)) continue;
    seen.add(dedupe);
    const category = t.tourism === 'hotel' ? 'Hotel' : CATEGORY[t.amenity] || 'Food';
    const veg = ['only', 'yes'].includes(t['diet:vegetarian']);
    out.push({
      id: `${el.type}/${el.id}`,
      name: t.name,
      category,
      cuisine: t.cuisine ? prettify(t.cuisine) : null,
      veg,
      distance: Math.round(haversine(lat, lng, plat, plng)),
      address:
        [t['addr:street'], t['addr:suburb'] || t['addr:city']].filter(Boolean).join(', ') || null,
      lat: plat,
      lng: plng,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${plat},${plng}`,
    });
  }
  out.sort((a, b) => a.distance - b.distance);
  return out.slice(0, limit);
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en', ...(options.headers || {}) },
    signal: AbortSignal.timeout(options.timeoutMs || 25000),
  });
  if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
  return res.json();
}

async function fetchOverpass(query) {
  let lastErr;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      return await fetchJson(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error('All Overpass endpoints failed');
}

// Simple in-memory cache to stay well within the free OSM usage limits.
const cache = new Map();
function remember(key, ttlMs, producer) {
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now()) return hit.val;
  const val = Promise.resolve(producer()).catch((e) => {
    cache.delete(key);
    throw e;
  });
  cache.set(key, { val, exp: Date.now() + ttlMs });
  return val;
}

async function nearbyFood({ lat, lng, radius = 1500 }) {
  const key = `n:${lat.toFixed(3)},${lng.toFixed(3)},${radius}`;
  return remember(key, 10 * 60 * 1000, async () => {
    const query =
      `[out:json][timeout:20];(` +
      `nwr["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${radius},${lat},${lng});` +
      `nwr["tourism"="hotel"](around:${radius},${lat},${lng});` +
      `);out center 80;`;
    const data = await fetchOverpass(query);
    return parseOverpass(data, lat, lng);
  });
}

async function geocode(q) {
  const key = `g:${q.toLowerCase()}`;
  return remember(key, 60 * 60 * 1000, async () => {
    const url = `${NOMINATIM}?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(q)}`;
    const arr = await fetchJson(url, { timeoutMs: 12000 });
    if (!arr.length) return null;
    return { lat: parseFloat(arr[0].lat), lng: parseFloat(arr[0].lon), label: arr[0].display_name };
  });
}

module.exports = { nearbyFood, geocode, parseOverpass, haversine };
