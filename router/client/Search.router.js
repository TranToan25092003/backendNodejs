"use strict";
const express = require("express");
const controller = require("../../controller/client/search.controller");
const router = new express.Router();

router.get("/", controller.searchByKeyword);

module.exports = router;
