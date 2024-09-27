const express = require("express");
const router = express.Router();
const myAccountController = require("../../controller/admin/myAccount.controller");

// upload img
const multer = require("multer");
const uploadCloudImg = require("../../middleware/admin/uploadImgToCloud.middleWare");
const upload = multer();
//end

//# [GET] /admin/my-account
router.get("/", myAccountController.getInformaitonMyaccount);

//#[GET] /admin/my-account/edit
router.get("/edit", myAccountController.editForm);

//#[PATCH] /admin/my-account/edit
router.patch(
  "/edit",
  upload.single("avartar"),
  uploadCloudImg.UploadImgToCloud,
  myAccountController.editProfile
);

module.exports = router;
