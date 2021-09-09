const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Boat = require('../models/Boat')

exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    // 1/Get the current booked boat
    const boat = await Boat.findById(req.params.boatId)
    console.log(boat)
    console.log(req.user)

    // 2 createcheckout session
    // await because call api to stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
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
