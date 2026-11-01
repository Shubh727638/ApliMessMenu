const express = require('express');
const store = require('../store');

const router = express.Router();

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact  { name, email, message }
router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim();
    const message = String(req.body?.message || '').trim();

    const errors = {};
    if (!name) errors.name = 'Please enter your name';
    else if (name.length > 100) errors.name = 'Name is too long';
    if (!EMAIL_RX.test(email)) errors.email = 'Please enter a valid email';
    if (message.length < 10) errors.message = 'Message should be at least 10 characters';
    else if (message.length > 2000) errors.message = 'Message is too long';

    if (Object.keys(errors).length) return res.status(400).json({ errors });

    await store.saveContact({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
