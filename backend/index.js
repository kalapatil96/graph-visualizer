// Import required modules
const express = require('express');
const graphRouter = require('./routes/graph'); // Router for /api/graph
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS so frontend (running on a different port) can access API
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Register the graph router at /api/graph
app.use('/api/graph', graphRouter);

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
