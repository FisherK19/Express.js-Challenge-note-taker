const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const routes = require('./routes/routes');
const path = require('path');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use(routes);

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve notes.html for /notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
