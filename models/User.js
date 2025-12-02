const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir le schema utilisateur
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'manager'],
    default: 'user'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Avant de sauvegarder, hasher le mot de passe
userSchema.pre('save', async function() { 
    if(!this.isModified('motDePasse')) return; 

    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    
});

// Comparer le mot de passe pour login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
