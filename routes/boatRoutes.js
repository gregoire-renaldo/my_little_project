const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const boatController = require('../controllers/boatController')
const reviewController = require('../controllers/reviewController')

router.get('/getBoat/:id',  boatController.getBoat)

// nested route with boat

// user create review for boat (after booking)
router.post('/:boatId/review', authController.protect, authController.restrictTo('user'), reviewController.createReview)

module.exports = router
