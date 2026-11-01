// Replaces all mess listings in MongoDB with the sample data.
// Usage: npm run seed   (from the Backend folder)
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const Mess = require('./models/Mess');
const seedMesses = require('./data/seedMesses');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aplimessmenu';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await Mess.deleteMany({});
    await Mess.insertMany(seedMesses);
    console.log(`Inserted ${seedMesses.length} messes`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
