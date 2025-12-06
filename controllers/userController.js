const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction bechn naamlou token JWT
const generateToken = (user) => {        
  return jwt.sign(
    { id: user._id, role: user.role }, // njibou lID w rol mtaa user 
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token valable 1 jour
  );
};

// POST /signup
//ken manager inajem w creer des utilisateurs 
exports.signup = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "manager") {
      return res.status(403).json({
        message: "Accès refusé : seul le manager peut créer un compte."
      });
    }

    const { nom, login, motDePasse, role } = req.body;

    // Vérifier si le login mawjoud wala lee
    const userExist = await User.findOne({ login });
    if (userExist) {
      return res.status(400).json({ message: "Login déjà utilisé" });
    }

    // Création user jdid
    const user = new User({ nom, login, motDePasse, role });
    await user.save();
    //succes
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        nom: user.nom,
        login: user.login,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /login
//kol user iconncti
exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;

    // nchoufou ken user mawjoud wala lee
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // mot de passe shiha wala lee
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /users
// manger barka inajme ichouf les listes users lkol
exports.getAllUsers = async (req, res) => {
  if (!req.user || req.user.role !== "manager") {
    return res.status(403).json({ message: "Accès refusé : manager uniquement." });
  }
  const users = await User.find().select("-motDePasse");
  res.json({ users });
};

// GET /users/:id
// ay manager ijib ay user w user normal ken rouhou 
// Manager peut voir tous, user seulement son propre profil
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "manager" && req.user.id !== id) {
    return res.status(403).json({ message: "Accès refusé" });
  }
  const user = await User.findById(id).select("-motDePasse");
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json({ user });
};

// PUT /users/:id
// ken manager inajem imodifi user
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Accès refusé : manager uniquement." });
  }

  const { nom, login, motDePasse, role } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  if (nom) user.nom = nom;
  if (login) user.login = login;
  if (motDePasse) user.motDePasse = motDePasse;
  if (role) user.role = role;

  await user.save();
  res.json({ message: "Utilisateur mis à jour", user });
};

// DELETE /users/:id
// supprimer user ken manager 
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Accès refusé : manager uniquement." });
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  res.json({ message: "Utilisateur supprimé" });
};
