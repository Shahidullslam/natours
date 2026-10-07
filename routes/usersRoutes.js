const express = require('express');

const userController = require('./../controller/usersController');
const authController = require('./../controller/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = userController;

const usersRouter = express.Router();
usersRouter.post(
  '/signup',
  authController.signup,
);
usersRouter.post('/login', authController.login);
usersRouter.get('/logout',authController.logout)
usersRouter.post(
  '/forgetPassword',
  authController.forgetPassword,
);
usersRouter.patch(
  '/resetPassword/:token',
  authController.resetPassword,
);

usersRouter.use(authController.protect);
usersRouter.patch(
  '/updateMyPassword',
  authController.updatePassword,
);
usersRouter.get(
  '/me',
  userController.getMe,
  userController.getUser,
);
usersRouter.patch(
  '/updateMe',userController.uploadUserPhoto,userController.resizeUserPhoto,
  userController.updateMe,
);
usersRouter.delete(
  '/deleteMe',
  userController.deleteMe,
);
usersRouter.use(authController.restrictTo('admin'));
usersRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);
usersRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = usersRouter;
