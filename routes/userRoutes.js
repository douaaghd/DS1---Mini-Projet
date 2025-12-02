const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);


//route protégée
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Route protégée', user: req.user });
});

module.exports = router;
