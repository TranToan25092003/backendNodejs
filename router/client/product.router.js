"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/product.controller");

//# in file index.router we was define the path for the link to the page that was '/product'
//# so in this page we only define the child of the path
//# / similar /product/
//# /create similar /product/create
router.get("/", controller.renderProduct);

//#[GET] /product/detail/:slug
router.get("/detail/:slug", controller.getDetail);

module.exports = router;
