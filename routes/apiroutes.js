// apiroutes.js

// Import required modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define routes

// GET route to fetch all notes
router.get('/notes', (req, res) => {
    // Logic to fetch all notes from the database
    fs.readFile(path.resolve(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// POST route to add a new note
router.post('/notes', (req, res) => {
    // Logic to add a new note to the database
    // For example, add a new note to a JSON file
    fs.readFile(path.resolve(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const notes = JSON.parse(data);
        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newNote);
        fs.writeFile(path.resolve(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(newNote);
        });
    });
});

// DELETE route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
    // Logic to delete a note from the database by ID
    // For example, delete a note from a JSON file by ID
    const noteId = req.params.id;
    res.send(`Delete note with ID ${noteId}`);
});

// PUT route to update a note by ID
router.put('/notes/:id', (req, res) => {
    // Logic to update a note in the database by ID
    // For example, update a note in a JSON file by ID
    const noteId = req.params.id;
    res.send(`Update note with ID ${noteId}`);
});

// Export the router
module.exports = router;

