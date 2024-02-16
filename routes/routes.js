const express = require('express');
const router = express.Router();
const path = require('path');

// Define routes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export router
module.exports = router;
