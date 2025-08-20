const express = require("express");
const userController = require("./../controller/usersController");
const { getAllUsers, getUser, createUser, updateUser, deleteUser } =
  userController;

const usersRouter = express.Router();
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = usersRouter;
