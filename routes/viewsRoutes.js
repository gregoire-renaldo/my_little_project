const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// '/' home page
router.get('', authController.isLoggedIn,  viewsController.getHome);

// my account
router.get('/me', authController.isLoggedIn, authController.protect, viewsController.getMyAccount )
module.exports = router;

router.post('/submit-user-data', authController.protect, viewsController.updateUserData )
