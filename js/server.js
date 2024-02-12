const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Define route to get all notes
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.resolve(__dirname, 'db/db.json'), 'utf8');
    const notes = JSON.parse(data);
    res.json(notes);
});

// Define route to add a new note
app.post('/api/notes', (req, res) => {
    // Your logic to add a new note to the database
});

// Define route to delete a note
app.delete('/api/notes/:id', (req, res) => {
    // logic to delete a note from the database
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
