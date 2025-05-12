import axios from 'axios';

// Set base URL for API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Anime services
export const animeService = {
  // Get all anime
  getAllAnime: async () => {
    const response = await api.get('/anime');
    return response.data;
  },

  // Get anime by ID
  getAnimeById: async (id) => {
    const response = await api.get(`/anime/${id}`);
    return response.data;
  },

  // Get characters for an anime
  getAnimeCharacters: async (animeId) => {
    const response = await api.get(`/anime/${animeId}/characters`);
    return response.data;
  },

  // Create anime (Admin)
  createAnime: async (animeData) => {
    const response = await api.post('/anime', animeData);
    return response.data;
  },

  // Update anime (Admin)
  updateAnime: async (id, animeData) => {
    const response = await api.put(`/anime/${id}`, animeData);
    return response.data;
  },

  // Delete anime (Admin)
  deleteAnime: async (id) => {
    const response = await api.delete(`/anime/${id}`);
    return response.data;
  },
};

// Character services
export const characterService = {
  // Get all characters
  getAllCharacters: async () => {
    const response = await api.get('/characters');
    return response.data;
  },

  // Get character by ID
  getCharacterById: async (id) => {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  },

  // Search characters
  searchCharacters: async (query) => {
    const response = await api.get(`/characters/search?query=${query}`);
    return response.data;
  },

  // Create character (Admin)
  createCharacter: async (characterData) => {
    const response = await api.post('/characters', characterData);
    return response.data;
  },

  // Update character (Admin)
  updateCharacter: async (id, characterData) => {
    const response = await api.put(`/characters/${id}`, characterData);
    return response.data;
  },

  // Delete character (Admin)
  deleteCharacter: async (id) => {
    const response = await api.delete(`/characters/${id}`);
    return response.data;
  },
};

export default api;