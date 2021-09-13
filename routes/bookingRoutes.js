const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const bookingController = require('../controllers/bookingController')

router.get('/checkout-session/:boatId', authController.protect, bookingController.getCheckoutSession)

// crud booking

router.post('create-booking', authController.protect, authController.restrictTo('admin'), bookingController.createBooking)

module.exports = router
