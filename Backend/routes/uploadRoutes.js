// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mess = require('../models/mess');

// Multer configuration for image upload
const upload = multer();

// Image upload route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, menu } = req.body;
    const newMess = new Mess({
      name,
      image: req.file.buffer, // Get image data from request
      menu,
    });
    await newMess.save();
    res.status(201).send('Mess created successfully');
  } catch (error) {
    console.error('Error uploading mess:', error);
    res.status(500).send('Error uploading mess');
  }
});

module.exports = router;
