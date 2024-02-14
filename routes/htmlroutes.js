const path = require('path');
const express = require('express');
const router = express.Router();

// Route to serve the landing page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Route to serve the notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../notes.html'));
});

module.exports = router;
