const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Anime image storage
const animeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'animepedia/anime',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 750, crop: 'fill' }]
  }
});

// Character image storage
const characterStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'animepedia/characters',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 400, height: 600, crop: 'fill' }]
  }
});

// Create upload middleware
const uploadAnimeImage = multer({ storage: animeStorage });
const uploadCharacterImage = multer({ storage: characterStorage });

module.exports = {
  uploadAnimeImage,
  uploadCharacterImage
};