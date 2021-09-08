const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');
const router = express.Router();

// not protected routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


// from here, all routes protected (connected)
router.use(authController.protect)
router.patch('/updatePassword', authController.updatePassword)



// test restricted route with role
router.get('/getAllUsers', authController.restrictTo('admin'),  userController.getAllUsers)
router.delete('/deleteUser/:id', authController.restrictTo('admin'), userController.deleteUser)


// a user can update his info
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe)

// a user can delete (de-activate) his account
router.delete('/deleteMe', userController.deleteMe)

module.exports = router
