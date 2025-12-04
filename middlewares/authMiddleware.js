const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    // 1. Njibou el header "Authorization" men el requête
    const authHeader = req.header('Authorization');
    let token;

    // 2. Nchoufou ken el header fama fih "Bearer " wla lé
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // On isole le token en coupant le préfixe 'Bearer ' (7 caractères)
        token = authHeader.substring(7); 
    }

    // 3. Ken el token mfamech wla format ghalet  ma najmouch nkamlou
    if (!token) {
        // Statut 401: Unauthorized (Non autorisé)
        return res.status(401).json({ message: 'Accès refusé. Token manquant ou format invalide.' });
    }

    try {
        // 4. Na3mlou verify lel token (nchoufou sahih wla expiré)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. N7otou el données mta3 el token (id, role...) fi req.user
        req.user = decoded; 

        // 6. next() = kmal route elli ba3dha
        next();
        
    } catch (err) {
        // Ken fama problème fil token → nraj3ou erreur
        res.status(401).json({ message: 'Token invalide ou expiré' }); 
    }
};