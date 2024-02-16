app.post('/api/notes', (req, res) => {
    // Extract note data from request body
    const { title, text } = req.body;
  
    saveData.saveNote({ title, text })
      .then(savedNote => {
        // Handle successful save
        res.json(savedNote);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while saving the note.' });
      });
  });
  