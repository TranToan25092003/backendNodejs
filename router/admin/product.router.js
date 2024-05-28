const express = require("express");
const multer = require("multer");
const router = express.Router();
const renderProductPage = require("../../controller/admin/product.controller");
const storage = require("../../helper/storage.multer");
const upload = multer({ storage: storage() });
const validate = require("../../validate/product.validate");
//# [GET] /product
router.get("/", renderProductPage.productPage);

//# [PATCH] /admin/product/change-status/status/id
router.patch("/change-status/:status/:id", renderProductPage.changeStatus);

//# [PATCH] /admin/product/change-multi
router.patch("/change-multi", renderProductPage.changeMulti);

//# [DELETE] /admin/product/delete
router.delete("/delete/:id", renderProductPage.deleteProduct);

//# [GET] /admin/product/create
router.get("/create", renderProductPage.renderFormCreate);

//#[POST] /admin/product/create
router.post(
  "/create",
  upload.single("thumbnail"), // add this function to create a img
  validate.createProduct,
  renderProductPage.createProduct
);

//#[GET] render edit form
router.get("/edit/:id", renderProductPage.editProduct);

//#[PATCH] update a product
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createProduct,
  renderProductPage.editProductPatch
);

//#[GET] render detail product
router.get("/detail/:id", renderProductPage.getDetailProduct);

module.exports = router;
