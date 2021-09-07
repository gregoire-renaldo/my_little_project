const express = require('express')
const router = express.Router();
const boatController = require('../controllers/boatController')
const authController = require('../controllers/authController')



router
.route('/createBoat')
.post(
  authController.protect,
  boatController.createBoat
  )

// router.patch('/updateBoat', authController.protect, boatController.updateBoat )
// router.delete('deleteBoat', authController.protect, boatController.deleteBoat)

module.exports = router
