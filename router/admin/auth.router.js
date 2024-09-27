const express = require("express");
const router = express.Router();
const authController = require("../../controller/admin/auth.controller");
//# [GET] /admin/auth/login
router.get("/login", authController.loginForm);

//#[POST] /admin/auth/login
router.post("/login", authController.login);

//# [GET] /admin/auth/logout
router.get("/logout", authController.logout);

module.exports = router;
