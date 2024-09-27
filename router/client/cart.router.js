"use strict";
const express = require("express");
const controller = require("../../controller/client/cart.controller");
const router = new express.Router();

//# [/cart/add]
router.post("/add/:id", controller.addToCart);

//# [/cart]
router.get("/", controller.cart);

//# [/cart/delete/:id]
router.get("/delete/:id", controller.deleteProductInCart);

//# [/cart/update/:productId/:quantity]
router.get("/update/:productId/:quantity", controller.updateCart);

//----
module.exports = router;
