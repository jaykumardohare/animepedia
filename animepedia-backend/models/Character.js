const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  japaneseName: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true
  },
  role: {
    type: String,
    enum: ['Main', 'Supporting', 'Antagonist', 'Other'],
    default: 'Supporting'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Unknown'],
  },
  age: {
    type: String
  },
  birthday: {
    type: String
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  abilities: [{
    type: String
  }],
  personality: {
    type: String
  },
  background: {
    type: String
  },
  voiceActors: {
    japanese: {
      type: String
    },
    english: {
      type: String
    }
  },
  quotes: [{
    text: String,
    episode: String
  }],
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

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;