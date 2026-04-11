const bookingController = require('../controller/bookingController');
const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.use(authController.protect);
router.get('/checkout-session/:tourId',bookingController.getCheckoutSession);
module.exports = router;
