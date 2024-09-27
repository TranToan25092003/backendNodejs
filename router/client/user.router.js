"use strict";
const express = require("express");
const controller = require("../../controller/client/user.controller");
const authMiddleWare = require("../../middleware/client/authen.middleWare");
const router = new express.Router();

//# GET [/user/signup]
router.get("/signup", controller.signupForm);

//# POST [/user/signup]
router.post("/signup", controller.signup);

//# GET [/user/signin]
router.get("/signin", controller.singinForm);

//# POST [/user/signin]
router.post("/signin", controller.singin);

//# GET [/user/logout]
router.get("/logout", controller.logout);

//# GET [/user/password/forgot]
router.get("/password/forgot", controller.forgotForm);

//# POST [/user/password/forgot]
router.post("/password/forgot", controller.sendOTPFogotPass);

//# GET [/user/password/otp?email=]
router.get("/password/otp", controller.otpForgotPasswordForm);

//# POST [/user/password/otp]
router.post("/password/otp", controller.confirmOTP);

//# GET [/user/password/reset]
router.get("/password/reset", controller.formReset);

//# POST [/user/password/reset]
router.post("/password/reset", controller.ResetPass);

//# GET [/user/infor]
router.get("/infor", authMiddleWare.requireAuth, controller.infor);

module.exports = router;
