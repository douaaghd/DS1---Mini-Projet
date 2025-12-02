const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);


// Route test
app.get('/', (req, res) => {
  res.send('API DS1 Projet fonctionne ! ');
});

module.exports = app;
