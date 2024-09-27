const express = require("express");
const controller = require("../../controller/client/friendChat.controller");
const router = new express.Router();

//# GET [/users/not-friend]
router.get("/not-friend", controller.ListRelate);

//# [GET] http://localhost:3000/users/request
router.get("/request", controller.cancelRequest);

//# [GET] http://localhost:3000/users/accept
router.get("/accept", controller.accept);
module.exports = router;
