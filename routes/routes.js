// Import necessary modules
const express = require('express');
const router = express.Router();

// Define the POST route for saving a new note
router.post('/api/notes', (req, res) => {
  const { title, text } = req.body;


  // Save the note data to your database or storage mechanism
  saveData.saveNote({ title, text })
    .then(savedNote => {
      res.status(201).json(savedNote);
    })
    .catch(error => {
      // If there's an error saving the note, send an error response
      console.error('Error saving note:', error);
      res.status(500).json({ error: 'Failed to save note' });
    });
});

// Export the router
module.exports = router;



