const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour créer un token JWT
const generateToken = (user) => {       //fih id user w role donc lsecurite makhir token expire baaed 1jour
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};



// Signup / création d'un utilisateur
exports.signup = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body; //njibou les données

    // nchoufou ken login existe déjà wala lee
    const userExist = await User.findOne({ login });
    if (userExist) return res.status(400).json({ message: 'Login déjà utilisé' });
     
    //creation user
    const user = new User({ nom, login, motDePasse, role });
    await user.save();
    //ken khatfet token yetebaath w maah msg de succes
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès', 
      token: generateToken(user) 
    });
  } catch (err) {
    //ken lee msg erreur
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;
    //nchoufou user haseb login 
    const user = await User.findOne({ login });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    //nchoufou ken password shiha wala lee
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });
    //ken shiha tocken yetebaath w maah msg succes 
    res.status(200).json({ 
      message: 'Connexion réussie khatfet', 
      token: generateToken(user) 
    });
  } catch (err) {
    //ken ghalta
    res.status(500).json({ message: err.message });
  }
};
