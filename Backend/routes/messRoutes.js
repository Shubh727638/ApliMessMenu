const express = require('express');
const router = express.Router();
const Mess = require('../models/mess');

// Define routes
router.get('/', async (req, res) => {
  try {
    // Fetch mess data from MongoDB
    const messes = await Mess.find();

    // Map over messes to include image URLs
    const messesWithImages = messes.map(mess => ({
      _id: mess._id,
      name: mess.name,
      menu: mess.menu,
      // Assuming the image field contains the image URL
      image: mess.image
    }));

    res.json(messesWithImages);
  } catch (error) {
    console.error('Error fetching mess data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
