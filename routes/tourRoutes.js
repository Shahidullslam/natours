const express = require("express");
const tourController = require("./../controller/tourController");
const { getAllTours, getTour, createTour, updateTour, deleteTour } =
  tourController;
const tourRouter = express.Router();
// tourRouter.param("id", tourController.checkID);
tourRouter.route("/top-5-cheap").get(tourController.aliasTopTours, getAllTours);
tourRouter.route("/tour-stats").get(tourController.getTourStats);
tourRouter.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = tourRouter;
