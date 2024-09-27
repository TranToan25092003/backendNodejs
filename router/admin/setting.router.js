const express = require("express");
const multer = require("multer");
const controller = require("../../controller/admin/setting.controller");
const router = express.Router();
const settingModel = require("../../model/Setting.model");
const uploadCloudImg = require("../../middleware/admin/uploadImgToCloud.middleWare");
const upload = multer();

//# [GET] /admin/setting/general
router.get("/general", controller.settinGeneral);

//# [PATCH] /admin/setting/general
router.patch(
  "/general", // add this function to create a img
  upload.single("logo"),
  uploadCloudImg.UploadImgToCloud,
  controller.updatesetting
);

module.exports = router;
