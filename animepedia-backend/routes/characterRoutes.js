const express = require('express');
const router = express.Router();
const {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  searchCharacters
} = require('../controllers/characterController');

// GET search characters
router.get('/search', searchCharacters);

// GET all characters
router.get('/', getCharacters);

// GET single character by ID
router.get('/:id', getCharacterById);

// POST create new character
router.post('/', createCharacter);

// PUT update character
router.put('/:id', updateCharacter);

// DELETE character
router.delete('/:id', deleteCharacter);

module.exports = router;