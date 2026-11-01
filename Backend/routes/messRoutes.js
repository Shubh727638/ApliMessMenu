const express = require('express');
const store = require('../store');

const router = express.Router();

// GET /api/messes?q=poha&type=veg
router.get('/', async (req, res, next) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 100) : '';
    const type = ['veg', 'non-veg'].includes(req.query.type) ? req.query.type : undefined;
    res.json(await store.listMesses({ q, type }));
  } catch (err) {
    next(err);
  }
});

// GET /api/messes/:id  (Mongo id or slug)
router.get('/:id', async (req, res, next) => {
  try {
    const mess = await store.getMess(req.params.id);
    if (!mess) return res.status(404).json({ error: 'Mess not found' });
    res.json(mess);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
