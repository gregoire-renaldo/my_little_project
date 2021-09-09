const express = require('express')
const router = express.Router();
const boatOwnerController = require('../controllers/boatOwnerController')
const authController = require('../controllers/authController');




router.post('/createBoat', authController.protect, authController.restrictTo('boat-owner'), boatOwnerController.uploadBoatPhoto, boatOwnerController.resizeBoatPhoto, boatOwnerController.createBoat)

// router.patch('/updateBoat', authController.protect, boatController.updateBoat )
// router.delete('deleteBoat', authController.protect, boatController.deleteBoat)

module.exports = router
