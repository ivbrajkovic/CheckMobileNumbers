// Server API

// Set environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Enable debug to console
const debug = require('debug')('server');

// Express application
const express = require('express');
const app = express();

// Logger
app.use(require('morgan')('dev'));

// Enable CORS
app.use(require('cors')());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static
app.use(express.static('client/dist'));

// API test routes
app.use('/api/validate', require('./api/routes/validate'));

// !For debug puropse only
app.get('/upload', (req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(
    '<form action="api/validate/file" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="file"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
});

// Start listening
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
