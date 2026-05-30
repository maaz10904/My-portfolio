const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Page not found. Go back to the home page: <a href="/">Home</a>');
});

app.listen(port, () => {
  console.log(`Portfolio site running on http://localhost:${port}`);
});
