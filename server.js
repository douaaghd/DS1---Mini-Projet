// Charger les variables d'environnement en premier
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Définir le port après avoir chargé dotenv
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT} `);
});

