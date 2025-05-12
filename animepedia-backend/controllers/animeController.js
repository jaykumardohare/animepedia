const Anime = require('../models/Anime');
const Character = require('../models/Character');

// @desc    Get all anime
// @route   GET /api/anime
// @access  Public
const getAnimeList = async (req, res) => {
  try {
    const anime = await Anime.find({}).sort({ title: 1 });
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single anime by ID
// @route   GET /api/anime/:id
// @access  Public
const getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new anime
// @route   POST /api/anime
// @access  Private (will need auth middleware)
const createAnime = async (req, res) => {
  try {
    const {
      title,
      originalTitle,
      image,
      description,
      releaseYear,
      studio,
      genres,
      episodes,
      status
    } = req.body;
const genresArray = Array.isArray(genres) ? genres : genres.split(',').map(genre => genre.trim());
    
const anime = new Anime({
      title,
      originalTitle,
      image,
      description,
      releaseYear,
      studio,
      genres: genresArray,
      episodes,
      status
    });

    const createdAnime = await anime.save();
    res.status(201).json(createdAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an anime
// @route   PUT /api/anime/:id
// @access  Private
const updateAnime = async (req, res) => {
  try {
    const {
      title,
      originalTitle,
      image,
      description,
      releaseYear,
      studio,
      genres,
      episodes,
      status
    } = req.body;

    const anime = await Anime.findById(req.params.id);

    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    anime.title = title || anime.title;
    anime.originalTitle = originalTitle || anime.originalTitle;
    anime.image = image || anime.image;
    anime.description = description || anime.description;
    anime.releaseYear = releaseYear || anime.releaseYear;
    anime.studio = studio || anime.studio;
    anime.genres = genres ? genres.split(',').map(genre => genre.trim()) : anime.genres;
    anime.episodes = episodes || anime.episodes;
    anime.status = status || anime.status;
    anime.updatedAt = Date.now();

    const updatedAnime = await anime.save();
    res.json(updatedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an anime
// @route   DELETE /api/anime/:id
// @access  Private
const deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);

    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    
    // Delete all characters associated with this anime
    await Character.deleteMany({ anime: req.params.id });
    
    await anime.remove();
    res.json({ message: 'Anime removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all characters for an anime
// @route   GET /api/anime/:id/characters
// @access  Public
const getAnimeCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ anime: req.params.id }).sort({ name: 1 });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnimeList,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeCharacters
};