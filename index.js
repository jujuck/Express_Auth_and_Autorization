const express = require('express');
const cookie = require('cookie-parser');
require('dotenv').config();
const app = express();
const connection = require('./db-config');

const { setUpRoutes } = require('./routes');

const PORT = process.env.PORT || 5000;

connection.connect(err => {
  if (err) console.log('Erreur de connexion à la DB', err)
  else console.log('Connexion à la DB ok, id ' + connection.threadId)
})

app.use(cookie())
app.use(express.json())


setUpRoutes(app);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})