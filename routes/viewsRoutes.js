const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const boatController = require('../controllers/boatController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// '/' home page
router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getHome);

router.route('boat/:id').get(boatController.getBoat);


// user: my account
router.get('/me', authController.isLoggedIn, authController.protect, viewsController.getMyAccount );

// boats booked
router.get('/my-boats', authController.protect, viewsController.getMyBoats )

// route to use if using method ation post in form, instead i'm using js to take the data and send it to the front
// router.post('/submit-user-data', authController.protect, viewsController.updateUserData )

// boat-owner: my account & create boat
router.get('/boat-owner-account', authController.isLoggedIn, authController.protect, authController.restrictTo('boat-owner'), viewsController.getMyAccountOwnerBoat)

module.exports = router;
