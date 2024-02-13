const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define API endpoints
app.use('/api/notes', require('../routes/apiroutes.js'));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

