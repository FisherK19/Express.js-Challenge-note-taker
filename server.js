const express = require('express');
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes'); // Make sure the path is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Mount API routes
app.use('/api', apiRoutes);

// Mount HTML routes
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});




