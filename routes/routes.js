const express = require('express');
const router = express.Router();

let notes = []; // Array to store notes

// GET all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// GET a single note by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// POST a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const id = uuidv4(); 
  const newNote = { id, title, text };
  notes.push(newNote);
  res.status(201).json(newNote);
});


// PUT update a note
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, text } = req.body;
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index] = { id, title, text };
    res.json(notes[index]);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// DELETE a note
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

module.exports = router;





