const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingsModel');
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  if (!stripe) {
    return next(new AppError('Stripe is not configured. Please add STRIPE_SECRET_KEY.', 500));
  }

  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/api/v1/bookings/checkout-success?tour=${tour.id}&user=${req.user.id}&price=${tour.price}&slug=${tour.slug}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price, slug } = req.query;

  if (!tour && !user && !price) return next();

  await Booking.create({
    tour,
    user,
    price,
  });

  res.redirect(`${req.protocol}://${req.get('host')}/tour/${slug || ''}?alert=booking`);
});

const getCheckoutSession = exports.getCheckoutSession;
const createBookingCheckout = exports.createBookingCheckout;
const createBooking = factory.createOne(Booking);
const getBooking = factory.getOne(Booking);
const getAllBookings = factory.getAll(Booking);
const updateBooking = factory.updateOne(Booking);
const deleteBooking = factory.deleteOne(Booking);

module.exports = {
  getCheckoutSession,
  createBookingCheckout,
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
