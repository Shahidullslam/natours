const express=require("express");
const router=express.Router();
const viewController=require('../controller/viewsController');
const authController=require('../controller/authController')
// router.use(authController.isLoggedIn);
router.get('/',authController.isLoggedIn,viewController.getOverview);
router.get('/tour/:slug',authController.protect,viewController.getTour);
router.get('/login',authController.isLoggedIn,viewController.getLoginForm);
router.get('/signup',authController.isLoggedIn,viewController.getSignupForm);
router.get('/me',authController.protect,viewController.getAccount);
router.post('/submit-user-data',authController.protect,viewController.updateUserData);
router.get('/my-tours',authController.protect,viewController.getMyTours);
module.exports=router;
