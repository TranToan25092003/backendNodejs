const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controller/admin/dashBoard.controller");

router.get("/", controllerAdmin.dashBoard);

module.exports = router;
