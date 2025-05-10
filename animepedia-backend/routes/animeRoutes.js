const express = require('express');
const router = express.Router();
const {
  getAnimeList,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeCharacters
} = require('../controllers/animeController');

// GET all anime
router.get('/', getAnimeList);

// GET single anime by ID
router.get('/:id', getAnimeById);

// GET all characters for an anime
router.get('/:id/characters', getAnimeCharacters);

// POST create new anime
router.post('/', createAnime);

// PUT update anime
router.put('/:id', updateAnime);

// DELETE anime
router.delete('/:id', deleteAnime);

module.exports = router;