const express = require('express');
const authController = require('./../controller/authController');
const tourController = require('./../controller/tourController');
const reviewRouter=require('./../routes/reviewRouts');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = tourController;
const tourRouter = express.Router();
// tourRouter.param("id", tourController.checkID);
tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, getAllTours);
tourRouter
  .route('/tour-stats')
  .get(tourController.getTourStats);
tourRouter
  .route('/monthly-plan/:year')
  .get( authController.protect,
    authController.restrictTo('admin','lead-guide','guide'),tourController.getMonthlyPlan);
tourRouter
  .route('/')
  .get( getAllTours)
  .post(authController.protect,authController.restrictTo('admin','lead-guide'),createTour);
tourRouter.route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-distance?distance=233&center=-40,45&unit=mi
tourRouter.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
  tourRouter
  .route('/:id')
  .get(authController.protect,getTour)
  .patch( authController.protect,
    authController.restrictTo('admin','lead-guide'),tourController.uploadTourImages,
    tourController.resizeTourImages,
    updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    deleteTour,
  );
// tourRouter
//     .route("/:tourId/reviews")
//     .post(
//       authController.protect,
//       authController.restrictTo("user"),
//       reviewController.createReview
//     );
tourRouter.use('/:tourId/reviews',reviewRouter);
module.exports = tourRouter;
