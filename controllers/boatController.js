const Boat = require('../models/Boat')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getBoat = catchAsync(async(req,res,next) => {
  // populate to facilitate reading of theavailableDate inside the boats instances \!/ performance
  // reviews from virtual populate
  const boat = await Boat.findById(req.params.id).populate('reviews');
  // Boat.findOne({ _id: req.params.id})
  if (!boat) {
    return next(new AppError('No boat found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      boat
    }
  })
})
