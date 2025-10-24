const express = require('express');
const graphRouter = require('./routes/graph');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// API routes
app.use('/api/graph', graphRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve Vue app for all frontend routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
