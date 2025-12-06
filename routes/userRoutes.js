const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Login users lkol
router.post('/login', userController.login);

// Signup ken manager
router.post('/signup', authMiddleware, userController.signup);

// Récupérer profil mtaal user  connecté
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Route protégée',
    user: req.user 
  });
});

// GET users lkol ken manager
router.get('/users', authMiddleware, userController.getAllUsers);

// GET user bel ID ken manager wala user bidou
router.get('/users/:id', authMiddleware, userController.getUserById);

// PUT mise à jour lel user bel Id ken manager
router.put('/users/:id', authMiddleware, userController.updateUser);

// DELETE user ken manager 
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
