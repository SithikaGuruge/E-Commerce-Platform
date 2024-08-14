const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(bodyParser.json());
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));


app.post('/cart/:id', (req, res) => {
    res.send('Cart Added');
});

app.put('/cart/:id', (req, res) => {
    res.send('Cart Updated');
});

app.delete('/cart/:id', (req, res) => {
    res.send('Cart Removed');
});

app.get('/cart/:id', (req, res) => {
    res.send('Cart List');
});

app.listen(4001, () => {
    console.log('Server is running on port 4001');
});

