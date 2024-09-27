const express = require("express");
const controller = require("../../controller/client/checkout.controller");
const router = new express.Router();

//# [/checkout]
// navigation to chechout form
router.get("/", controller.checkout);

//# [/checkout/order]
// chekc out
router.post("/order", controller.checkoutCard);

//# [/checkout/success/:id]
router.get("/success/:id", controller.success);

module.exports = router;
