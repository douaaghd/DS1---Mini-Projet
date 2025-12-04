// models/Project.js
const mongoose = require('mongoose');

// Définition du schéma pour un projet
const projectSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true // nom du projet obligatoire
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // référence à l'utilisateur propriétaire
    required: true
  },
  statut: {
    type: String,
    enum: ['en cours', 'terminé', 'en pause'], // valeurs possibles
    default: 'en cours'
  },
  createdAt: {
    type: Date,
    default: Date.now // date de création automatique
  }
});

module.exports = mongoose.model('Project', projectSchema);
