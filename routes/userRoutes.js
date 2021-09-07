const express = require('express')
const multer = require('multer')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');

// multer config, destination folder
const upload = multer({ dest: 'public/img/users' });

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updatePassword', authController.protect, authController.updatePassword)

// test restricted route with role
router.get('/getAllUsers', authController.protect, authController.restrictTo('admin'),  userController.getAllUsers)
router.delete('/deleteUser/:id', authController.protect, authController.restrictTo('admin'), userController.deleteUser)


// a user can update his info
router.patch('/updateMe', authController.protect, userController.updateMe)

// a user can delete (de-activate) his account
router.delete('/deleteMe', authController.protect, userController.deleteMe)

module.exports = router
