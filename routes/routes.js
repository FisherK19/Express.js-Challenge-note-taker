const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

// Function to read notes from db.json file
function getNotes() {
  const data = fs.readFileSync(path.join(__dirname, '../Develop/db/db.json'), 'utf8');
  return JSON.parse(data) || [];
}

// Function to save notes to db.json file
function saveNotes(notes) {
  fs.writeFileSync(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(notes), 'utf8');
}

// Route to get all notes
router.get('/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

// Route to save a new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// Route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = getNotes();
  
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    res.json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

module.exports = router;



