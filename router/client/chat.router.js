const express = require("express");
const controller = require("../../controller/client/chat.controller");
const router = new express.Router();

//# GET [/chat]
router.get("/", controller.chat);

module.exports = router;
