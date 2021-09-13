const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  boat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Boat',
    required: [true, 'Review must have a boat']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  // if an admin want to receive a payment without stripe, make methods with api to receive money and validate a payment & booking
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'boat',
    select: 'name'
  })
})



module.exports = mongoose.model('Booking', bookingSchema);
