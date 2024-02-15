const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Use API routes defined in apiRoutes.js
app.use('/api', apiRoutes);

// Use HTML routes defined in htmlRoutes.js
app.use('/', htmlRoutes);

// Listener
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});

