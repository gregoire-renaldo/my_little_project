const express = require('express')
const router = express.Router();
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')



router.get('/getAllReviews', reviewController.getAllReviews)

// just create review, not nested
// router.post('/createReview', authController.protect, authController.restrictTo('user'), reviewController.createReview)

module.exports = router
