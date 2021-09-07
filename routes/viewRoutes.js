const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// '/' est la route racine
router.get('', authController.isLoggedIn,  (req, res, next) => {
  res.render('pages/home');
});

module.exports = router;
