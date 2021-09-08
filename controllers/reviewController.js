const Review = require('../models/Review')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')


exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(req.params.boat)
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  })
})


exports.createReview = catchAsync(async (req, res, next) => {
  // if boat not in the body, check the params
  if(!req.body.boat) req.body.boat = req.params.boatId
  // user from protect middleware
  if(!req.body.user) req.body.user = req.user.id
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  })
})
