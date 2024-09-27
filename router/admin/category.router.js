const express = require("express");
const multer = require("multer");
const router = express.Router();
const validateCategory = require("../../validate/category.validate");
const uploadCloudImg = require("../../middleware/admin/uploadImgToCloud.middleWare");
const categoryController = require("../../controller/admin/category.controller");
const {
  productCategory,
} = require("../../controller/admin/product.controller");

const upload = multer();

//#[GET] /admin/productCategory
router.get("/", categoryController.getAllCategory);

//#[GET] /admin/productCategory/create
router.get("/create", categoryController.createCategoryForm);

//#[POST] /admin/productCategory/create
router.post(
  "/create",
  upload.single("thumbnail"), // add this function to create a img
  uploadCloudImg.UploadImgToCloud,
  validateCategory.validateInput,
  categoryController.createCategory
);

//#[GET] /admin/productCategory/update/:id
router.get("/update/:id", categoryController.renderFormUpdateCategory);
module.exports = router;

//#[PATCH] /admin/productCategory/update/:id
router.patch(
  "/update/:id",
  upload.single("thumbnail"), // add this function to create a img
  uploadCloudImg.UploadImgToCloud,
  categoryController.UpdateCategory
);
