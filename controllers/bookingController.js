const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Boat = require('../models/Boat');
const Booking = require('../models/Booking')

exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    // 1/Get the current booked boat
    const boat = await Boat.findById(req.params.boatId)

    console.log(req.params)
  console.log(boat)

    // 2 createcheckout session
    // await because call api to stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // succes url, if payment ok
    // redirect to home success_url: `${req.protocol}://${req.get('host')}/`,
    // to create a booking with mongoose schema, query string !! NOT SECURE ! possible to book without paying !!
    success_url: `${req.protocol}://${req.get('host')}/?boat=${req.params.boatId}&user=${req.user.id}&price=${boat.price}`,
    // to storee bookings in a safe w  y, webhooks stripe
    cancel_url: `${req.protocol}://${req.get('host')}/boat/${boat.Id}`,
    // protected route, user is already in the request
    customer_email: req.user.email,
    // create a new booking in the db
    client_reference_id: req.params.boatId,
    line_items: [
      {
        name: `${boat.name}`,
        description: boat.description,
        // to set with ain image
        images: [`${req.protocol}://${req.get('host')}/img/boat/${boat.photo}`],
        amount: boat.price * 100,
        currency: 'eur',
        quantity: 1
      }
    ]
  })
    res.status(200).json({
      status: 'success',
      session
    });
  });


    // add middleware to booking stack, in routes of course, to handle the query string wi
    //  success_url: `${req.protocol}://${req.get('host')}/?boat=${req.params.boatId}&user=${req.user.id}&price=${req.boat.price}`,
    //  get home: / so add in route '/'
  exports.createBookingCheckout = catchAsync(
    async(req, res, next) => {
      const { boat, user, price} = req.query
      if(!boat && !user && !price) return next();
      // no need for a variable
      await Booking.create({boat, user, price});
      // next, let's remove the query string, a bit more secure
      res.redirect(req.originalUrl.split('?')[0])
    }
  )
