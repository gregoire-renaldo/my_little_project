const User = require('../models/User')
// const Boat = require('../models/Boat')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHome = catchAsync(async (req, res, next) => {
  res.render('pages/home');
  }
)

// --------------------------  Role: user --------------------------------------

exports.getMyAccount = catchAsync(async(req,res, next) => {
  res.status(200).render('pages/account', {
    title: 'Your account'
  });
});

exports.updateUserData = catchAsync(
  async(req, res, next) => {
    // have to precise what we want to update, to avoid hack
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      // body.firstname = name of the the attribute in html form
      //  <input id="firstname" type="text" name="firstname" >
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
    );
    res.status(200).render('pages/account', {
      title: 'Your account',
      user: updatedUser
    });
  })

  // --------------------------  Role: owner-boat --------------------------------------


exports.getMyAccountOwnerBoat = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/boat-owner-account', {
    title: 'Your boat owner account'
  });
})
