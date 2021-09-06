const mongoose = require('mongoose');
// validations à revoir

// methode to check if boat is available,
// and if start_time is before Date.now,
// delete member of colection




const dateAvailableSchema = mongoose.Schema({
  start_date: Date,
  end_date: Date,
  available: Boolean
});



// clé new: true or false to know if it's recently created
const boatSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price_for_rent: { type: Number, required: true },
  imagePath: { type: String },
  user_id: { type: String  },
  dateAvailable: [dateAvailableSchema],
  date: dateAvailableSchema,
  place: {
    // geojson, 1 boat place
    type: {
      type: String,
      default: 'Point',
      // to limit the options : Enum, only Points
      enum: ['Point']
    },
    // coordinates Enum only number, lat (horiz) & long (vert)
    coordinates: [Number],
    address: String,
  },
  // "ratingsAverage": 4.8,
  // "ratingsQuantity": 6,
});


// Query MIDDLEWARE
// regex forevery mongo request starting by "find => findById etc .."
// refacto for populate
boatSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'dateAvailable',
    // select: '' fields ypu don't want
  });
  next();
})

module.exports = mongoose.model('Boat', boatSchema);
