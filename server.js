const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3004;
const publicPath = path.join(__dirname, 'public');
require('dotenv').config();


// Allow requests from http://localhost:3004
app.use(cors({
  origin: 'http://localhost:3004'
}));

// Serve static files from the public directory
app.use(express.static(publicPath));

// Define route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
