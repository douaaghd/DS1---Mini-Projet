const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // njibou token mel headers
  const token = req.header('Authorization');

  // ken ma fama token → acces mayetekbelech
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    // naamlou verify lel token w najmou nal9aw fih id, role...
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // nrakzou user f req.user bech najmou nestaamlouh fi routes okhra
    req.user = decoded;

    // next() = kammel route
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide ou expiré' });
  }
};
