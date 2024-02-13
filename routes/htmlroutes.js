// Import required modules
const express = require('express');
const router = express.Router();

// Define routes

// Example GET route
router.get('/api/example', (req, res) => {
    // Handle GET request
    res.send('Response from GET request');
});

// Example POST route
router.post('/api/example', (req, res) => {
    // Handle POST request
    res.send('Response from POST request');
});

// Example route with URL parameters
router.get('/api/example/:id', (req, res) => {
    // Access URL parameter using req.params
    const id = req.params.id;
    // Handle request based on URL parameter
    res.send(`Response from GET request with id ${id}`);
});

// Export the router
module.exports = router;

