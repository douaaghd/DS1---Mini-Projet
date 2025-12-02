// Charger les variables d'environnement en premier
require('dotenv').config();

const connectDB = require('./config/db');
//houni app est bien chargee juste le serveur mezel pas demarré encore 
const app = require('./app');
// Définir le port ama baed  dotenv chargee
const PORT = process.env.PORT || 5000;
//fonction pour demarrer le serveur 
const startServer = async () => {
    try {
        // Tawa nestannew el connexion m3a el base (mongo iwali hather)
        await connectDB(); 

        // Ken el connexion shiha, on lance connexion 
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT} `);
            console.log('MongoDB prêt et serveur en écoute.');
            // El base tawa 7adhra w el serveur yestanna fi les requêtes.
        });
        } catch (error) {
        // Kén fama ghalta kbira fil démarrage wala connexion
        console.error("Échec critique lors du démarrage :", error.message);
        process.exit(1);
    }
};
//execution (bech testanan connexion lel mongodb bech tekhdem grace a await)
startServer();