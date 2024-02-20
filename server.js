const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const routes = require('./routes/routes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use(routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
