// review / rating / createdAt / ref to Boat / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'review can not be empty']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    boat: {
      type: mongoose.Schema.ObjectId,
      ref: 'Boat',
      required: [true, 'Review must belong to a boat']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)


// Query MIDDLEWARE
// regex for every mongo request starting by "find => findById etc .."
// refacto for populate
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstname lastname photo'
  })
  // .populate({
  //   path: 'boat',
  //   // select: '' only fields you want to display
  // });
  next();
})



module.exports = mongoose.model('Review', reviewSchema);
