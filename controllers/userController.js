const User = require('../models/User')
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req,res,nex ) => {
  const users = await User.find()

  // send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})


exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  res.status(204).json({
    status: 'success',
    data: {
      user
    }
  })
})
