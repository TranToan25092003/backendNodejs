"use strict";
const express = require("express");
const controller = require("../../controller/client/home.controller");
const router = new express.Router();

router.get("/", controller.renderHomePage);

module.exports = router;
