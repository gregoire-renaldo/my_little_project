const User = require('../models/User')
// const Boat = require('../models/Boat')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/Booking');
const Boat = require('../models/Boat');

exports.getHome = catchAsync(async (req, res, next) => {
  res.render('pages/home');
  }
)


exports.getBoat = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const boat = await Boat.findOne({ id: req.params.id })

  if (!boat) {
    return next(new AppError('There is no boat with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('pages/boat/:id', {
    title: `${boat.name} boat`,
    boat
  });
});

// --------------------------  Role: user --------------------------------------

exports.getMyAccount = catchAsync(async(req,res, next) => {
  res.status(200).render('pages/account', {
    title: 'Your account'
  });
});

// could do with virtual populate
// boats booked
exports.getMyBoats = catchAsync(async(req,res, next) => {
  const bookings = await Booking.find({user: req.user.id})
  const boatIds = bookings.map(el => el.boat)
  const boats = await Boat.find({ _id: {$in: boatIds }})
  console.log(boats)
  res.status(200).render('pages/my-boats', {
    title: 'my boats',
    boats
  })
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
