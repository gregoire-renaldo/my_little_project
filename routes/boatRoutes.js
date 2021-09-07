const express = require('express')
const router = express.Router();
const boatController = require('../controllers/boatController')



router.get('/getBoat/:id',  boatController.getBoat)

module.exports = router
