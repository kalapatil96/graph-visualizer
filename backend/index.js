// Import required modules
const express = require('express');
const graphRouter = require('./routes/graph'); // Router for /api/graph
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Correctly uses the environment variable with a fallback


// Enable CORS so frontend (running on a different port) can access API
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Register the graph router at /api/graph
app.use('/api/graph', graphRouter);

// Serve the static files from the React app's dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//    This serves the vue app's index.html file.
app.get((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Catch-all route for unknown endpoints (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (optional, for unexpected errors)
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
