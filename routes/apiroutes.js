const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Read notes from db.json
function getNotes() {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(data) || [];
}

// Save notes to db.json
function saveNotes(notes) {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8');
}

router.get('/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

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

