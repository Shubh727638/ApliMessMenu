require('dotenv').config({ quiet: true });

const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const store = require('./store');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aplimessmenu';
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
app.disable('x-powered-by');
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map((s) => s.trim()) : true,
  })
);
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, database: store.useDb() ? 'mongodb' : 'sample-data' });
});
app.use('/api/messes', require('./routes/messRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api', require('./routes/placesRoutes'));
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// Serve the production React build when it exists (single-server deploy).
const buildDir = path.join(__dirname, '..', 'FrontEnd', 'build');
if (fs.existsSync(buildDir)) {
  app.set('trust proxy', true);
  app.use(express.static(buildDir, { maxAge: '7d', index: false }));

  const { metaFor } = require('./meta');
  const indexHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

  // Inject per-page social-preview tags so shared links render a rich card.
  app.get('*', async (req, res, next) => {
    try {
      const html = indexHtml.replace(/<meta name="ssr-social"[^>]*>/, await metaFor(req));
      res.set('Cache-Control', 'no-cache').type('html').send(html);
    } catch (err) {
      next(err);
    }
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.userMessage || 'Something went wrong. Please try again.' });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB');
    const seeded = await store.seedIfEmpty();
    if (seeded) console.log(`Seeded ${seeded} sample messes`);
  } catch (err) {
    console.warn(`MongoDB unavailable (${err.message}). Serving built-in sample data.`);
  }
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

start();
