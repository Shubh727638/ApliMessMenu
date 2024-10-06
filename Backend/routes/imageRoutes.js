// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Mess = require('../models/mess');

// Image retrieval route
router.get('/:id', async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess || !mess.image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', 'image/jpeg'); // Set content type header
    res.send(mess.image); // Send image data
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).send('Error retrieving image');
  }
});

module.exports = router;
