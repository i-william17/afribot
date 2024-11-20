const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: false },
  category: { type: String, required: false },
  date: { type: Date, required: false },
  location: { type: String, required: false },
  description: { type: String, required: false },
  schedule: { type: String },
  capacity: { type: Number, required: false },
  fees: { type: Number, required: false },
  instructorName: { type: String, required: false },
  instructorTitle: { type: String },
  instructorBio: { type: String },
  tags: [{ type: String }],
  goodies: [{ type: String }],
  image: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);