// Route to get all notes
router.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

// Route to save a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// Route to delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = getNotes();
  
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});





