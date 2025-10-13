// Import required modules
const express = require('express');
const graphRouter = require('./routes/graph'); // Router for /api/graph
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS so frontend (different port) can access API
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Register the graph router at /api/graph
app.use('/api/graph', graphRouter);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
