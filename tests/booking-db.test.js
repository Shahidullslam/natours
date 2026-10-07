const assert = require('node:assert/strict');
const bookingController = require('../controller/bookingController');
const bookingRoutes = require('../routes/bookingRoutes');

assert.equal(typeof bookingController.getCheckoutSession, 'function');
assert.equal(typeof bookingController.createBookingCheckout, 'function');
assert.ok(Array.isArray(bookingRoutes.stack), 'Booking routes are not registered');
const hasSuccessRoute = bookingRoutes.stack.some((layer) => layer.route && layer.route.path === '/checkout-success');
assert.equal(hasSuccessRoute, true, 'Stripe success route is missing');

console.log('Booking DB route checks passed');
