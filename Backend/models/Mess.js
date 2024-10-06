// mess.js
const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
  name: String,
  image: Buffer, // Store image as Buffer
  menu: [String],
});

module.exports = mongoose.model('Mess', messSchema);
