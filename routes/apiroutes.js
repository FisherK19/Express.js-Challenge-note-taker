// Dependencies
const router = require('express').Router();

const { retrieveNotes, addNote, deleteNote } = require('../db/saveData');

// GET-request
router.get('/notes', function (req, res) {
    retrieveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// POSTrequest
router.post('/notes', (req, res) => {
    addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

// Bonus - DELETE 
router.delete('/notes/:id', function (req, res) {
    deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router; // Use module.exports instead of export default


