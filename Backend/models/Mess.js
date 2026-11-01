const mongoose = require('mongoose');

const messSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    area: { type: String, trim: true },
    address: { type: String, trim: true },
    description: String,
    type: { type: String, enum: ['veg', 'non-veg'], default: 'veg' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    monthlyPrice: Number,
    mealPrice: Number,
    timings: { lunch: String, dinner: String },
    phone: String,
    image: String, // URL or path served by the frontend, e.g. /images/mess1.jpg
    tags: [String],
    menu: {
      breakfast: [String],
      lunch: [String],
      dinner: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mess', messSchema);
