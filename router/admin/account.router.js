const express = require("express");
const router = express.Router();
const accountController = require("../../controller/admin/account.controller");

// upload img
const multer = require("multer");
const uploadCloudImg = require("../../middleware/admin/uploadImgToCloud.middleWare");
const upload = multer();
// upload img
const validate = require("../../validate/account.validate");

//#[GET] /admin/account
router.get("/", accountController.renderAccounts);

//#[GET] /admin/account/create
router.get("/create", accountController.createForm);

//#[POST] /admin/account/create
router.post(
  "/create",
  upload.single("avartar"),
  uploadCloudImg.UploadImgToCloud,
  validate.validateInformation,
  accountController.createAccount
);

//#[GET] /admin/account/edit
router.get("/edit/:id", accountController.renderFormEditAccount);

//#[PATCH] /admin/account/edit
router.patch(
  "/edit/:id",
  uploadCloudImg.UploadImgToCloud,
  validate.validateEditAccount,
  accountController.editAccount
);

module.exports = router;
