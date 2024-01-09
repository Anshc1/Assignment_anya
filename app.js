const express = require('express');
const createMockData = require('./scripts/generateMockData'); // Adjust the path
require('dotenv').config();
const app = express();
const authorRoutes = require('./routes/authorRoutes')
const mongoose = require('mongoose');
const URI = process.env.MONGO_DB_URI;
const bookRoutes = require('./routes/bookRoutes');
mongoose.connect(URI)
  .then(() => {
    console.log("DB CONNECTED")
  }).catch((err) => {
    console.log(err);
  })
app.use(express.json())

app.use('/', authorRoutes)
app.use('/authors', authorRoutes)
app.use('/books', bookRoutes);


app.get('/', (req, res) => {
  res.json({ message: "Connected" });
});

createMockData().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
