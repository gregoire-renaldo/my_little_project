const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const sharp = require('sharp');

// to ave on disk
// const multerStorage = multer.diskStorage({
//   destination: (req, file,cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file,cb) => {
//     const ext = file.mimetype.split('/')[1];
//     // null == if no error, first arg of cb() == error
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })

// to store image in memory, as a buffer
const multerStorage = multer.memoryStorage()


// to check if file is an image mimitype: image/something
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image, please upload an image', 400), false)
  }
}
// multer config, destination folder
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// upload.single('photo') photo == name of the field in the form
exports.uploadUserPhoto = upload.single('photo');

// resize photo
exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  // set filename, need filemane in filterBody
  // no need to set ext, toformat... format :-)
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // square images fo avatar 500*500, sharp crop by default
  // resize(width height options)
  sharp(req.file.buffer)
  .resize(500,500)
  .toFormat('jpeg')
  .jpeg({quality: 90})
  .toFile(`public/img/users/${req.file.filename}`);

  // next for updateMe
  next()
};

// ...allowFields = array with all arguments
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // obj == req.body
  // forEach properties of req.body
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.getMe = (req,res, next) => {
  req.params.id = req.user.id;
  next()
}

exports.getUser = catchAsync(async(req,res,next) => {
  user = await User.findById(req.params.id)

  if(!user) {
    return next(new AppError('No document found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.updateMe = catchAsync(async(req, res, next) => {
  console.log(req.file)
  console.log(req.body)
    // 1) create error id user post password
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('route not for password upddate', 400 ))
    }
    // 2 update user, close the door to change role etc.. add the field
    const filteredBody = filterObj(req.body, 'firstname', 'lastname', 'email', 'photo');
    // if a file (photo) is uploaded
    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true} )
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    })
  }
)

exports.getAllUsers = catchAsync(async (req, res, next ) => {
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

// de-activate accont account instead of deleting
exports.deleteMe = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data : null
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
