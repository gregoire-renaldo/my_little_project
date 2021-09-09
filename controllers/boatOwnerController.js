const Boat = require('../models/Boat');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const sharp = require('sharp');
const multerStorage = multer.memoryStorage();

// to check if file is an image mimitype: image/something
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image, please upload an image', 400), false)
  }
};

// multer config, destination folder
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// upload.single('photo') photo == name of the field in the form
exports.uploadBoatPhoto = upload.single('photo');

// resize photo
exports.resizeBoatPhoto = (req, res, next) => {
  if (!req.file) return next();
  // set filename, need filemane in filterBody
  // no need to set ext, toformat... format :-)
  req.file.filename = `boat-${req.user.id}-${Date.now()}.jpeg`;
  // square images fo avatar 500*500, sharp crop by default
  // resize(width height options)
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/boats/${req.file.filename}`);
  // next for updateMe
  next()
};

// ...allowFields = array with all arguments
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // obj == req.body
  // forEach properties of req.body
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.createBoat = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'name', 'description', 'price', 'maxPeople', 'photo', 'user');
  // if a file (photo) is uploaded
  if (req.file) filteredBody.photo = req.file.filename;
  if (!req.body.user) filteredBody.user = req.user.id
  console.log(req.body)
  console.log(filteredBody)
  const newBoat = await Boat.create(filteredBody);
  res.status(201).json({
    status: 'success',
    data: {
      boat: newBoat
    }
  })
});

exports.updateBoat = catchAsync(async (req, res, next) => {
  const boat = Boat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!boat) {
    return next(new AppError('No boat found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      boat
    }
  });
});


exports.deleteBoat = catchAsync(async (req, res, next) => {
  const boat = await Boat.findByIdAndDelete(req.params.id)
  if (!boat) {
    return next(new AppError('No boat found with that ID', 404))
  }
  res.status(204).json({
    status: 'success',
    data: {
      boat
    }
  })
})
