const express = require('express');
const router = express.Router();
const { notes } = require('../db/db.json'); 

// Get all notes
router.get('/notes', (req, res) => {
  res.json(notes);
});

// Add a new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Math.random().toString(36).substr(2, 9); 
  notes.push(newNote);
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

module.exports = router;
