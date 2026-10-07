const assert = require('node:assert/strict');
const viewController = require('../controller/viewsController');
const viewRoutes = require('../routes/viewRoutes');

assert.equal(typeof viewController.getSignupForm, 'function', 'Signup form view factory is missing');
assert.ok(Array.isArray(viewRoutes.stack), 'View routes are not registered');
const hasSignupRoute = viewRoutes.stack.some((layer) => layer.route && layer.route.path === '/signup');
assert.equal(hasSignupRoute, true, 'GET /signup route is missing');

console.log('Signup UI route checks passed');
