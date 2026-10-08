const reviewController = require('./../controller/reviewController');
const express = require('express');
const authController = require('../controller/authController');
const router = express.Router({
  mergeParams: true,
});
router.use(authController.protect);
router
  .route('/')
  .get(
    authController.restrictTo('user'),
    reviewController.getAllReviews,
  )
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );
router
  .route('/:id')
  .patch(
    
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview,
  )
  .get(reviewController.getReview)
  .delete(
    
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview,
  );
module.exports = router;
