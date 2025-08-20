const express = require("express");
const tourController = require("./../controller/tourController");
const { getAllTours, getTour, createTour, updateTour, deleteTour } =
  tourController;
const tourRouter = express.Router();
// tourRouter.param("id", tourController.checkID);
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = tourRouter;
