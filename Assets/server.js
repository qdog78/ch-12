const express = require('express');
const app = express();
const { presentOptions } = require('./index');

// Route to handle requests
app.get('/', async (req, res) => {
  try {
    await presentOptions();
    res.send('Application completed successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
