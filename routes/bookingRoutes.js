const bookingController = require('../controller/bookingController');
const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.use(authController.protect);
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);
router.get('/checkout-success', bookingController.createBookingCheckout);
router.route('/').get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;


