const Character = require('../models/Character');
const Anime = require('../models/Anime');

// @desc    Get all characters
// @route   GET /api/characters
// @access  Public
const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({})
      .populate('anime', 'title image')
      .sort({ name: 1 });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a character by ID
// @route   GET /api/characters/:id
// @access  Public
const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
      .populate('anime', 'title image releaseYear'); // Populate anime info
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new character
// @route   POST /api/characters
// @access  Private
const createCharacter = async (req, res) => {
  try {
    const {
      name,
      japaneseName,
      image,
      anime,
      role,
      gender,
      age,
      birthday,
      height,
      weight,
      abilities,
      personality,
      background,
      voiceActors,
      quotes
    } = req.body;

    // Check if anime exists
    const animeExists = await Anime.findById(anime);
    if (!animeExists) {
      return res.status(400).json({ message: 'Invalid anime ID' });
    }

    const character = new Character({
      name,
      japaneseName,
      image,
      anime,
      role,
      gender,
      age,
      birthday,
      height,
      weight,
      abilities: abilities ? abilities.split(',').map(ability => ability.trim()) : [],
      personality,
      background,
      voiceActors: {
        japanese: voiceActors?.japanese || '',
        english: voiceActors?.english || ''
      },
      quotes: quotes ? JSON.parse(quotes) : []
    });

    const createdCharacter = await character.save();
    res.status(201).json(createdCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a character
// @route   PUT /api/characters/:id
// @access  Private
const updateCharacter = async (req, res) => {
  try {
    const {
      name,
      japaneseName,
      image,
      anime,
      role,
      gender,
      age,
      birthday,
      height,
      weight,
      abilities,
      personality,
      background,
      voiceActors,
      quotes
    } = req.body;

    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // If anime is being updated, check if it exists
    if (anime && anime !== character.anime.toString()) {
      const animeExists = await Anime.findById(anime);
      if (!animeExists) {
        return res.status(400).json({ message: 'Invalid anime ID' });
      }
    }

    character.name = name || character.name;
    character.japaneseName = japaneseName || character.japaneseName;
    character.image = image || character.image;
    character.anime = anime || character.anime;
    character.role = role || character.role;
    character.gender = gender || character.gender;
    character.age = age || character.age;
    character.birthday = birthday || character.birthday;
    character.height = height || character.height;
    character.weight = weight || character.weight;
    character.abilities = abilities ? abilities.split(',').map(ability => ability.trim()) : character.abilities;
    character.personality = personality || character.personality;
    character.background = background || character.background;
    
    if (voiceActors) {
      character.voiceActors = {
        japanese: voiceActors.japanese || character.voiceActors.japanese,
        english: voiceActors.english || character.voiceActors.english
      };
    }
    
    if (quotes) {
      character.quotes = JSON.parse(quotes);
    }
    
    character.updatedAt = Date.now();

    const updatedCharacter = await character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a character
// @route   DELETE /api/characters/:id
// @access  Private
const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    await character.remove();
    res.json({ message: 'Character removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search characters
// @route   GET /api/characters/search
// @access  Public
const searchCharacters = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query required' });
    }
    
    const characters = await Character.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { japaneseName: { $regex: query, $options: 'i' } }
      ]
    }).populate('anime', 'title image');
    
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  searchCharacters
};