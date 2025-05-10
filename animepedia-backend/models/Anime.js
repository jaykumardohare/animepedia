const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  originalTitle: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number
  },
  studio: {
    type: String
  },
  genres: [{
    type: String
  }],
  episodes: {
    type: Number
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Upcoming'],
    default: 'Completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;