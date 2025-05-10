const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/anime', require('./routes/animeRoutes'));
app.use('/api/characters', require('./routes/characterRoutes'));
// app.use('/api/users', require('./routes/userRoutes')); // Uncomment if adding user functionality

// Default route
app.get('/', (req, res) => {
  res.send('Animepedia API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});