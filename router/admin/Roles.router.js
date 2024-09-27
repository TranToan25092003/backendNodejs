const express = require("express");
const router = express.Router();
const roleController = require("../../controller/admin/role.controller");
//# [GET] /admin/roles
router.get("/", roleController.AllRoles);

//# [GET] /admin/roles/create
router.get("/create", roleController.renderFormCreatRole);

//# [POST] /admin/roles/create
router.post("/create", roleController.createANewRole);

//# [GET] /admin/roles/edit/:id
router.get("/edit/:id", roleController.renderEditForm);

//# [GET] /admin/roles/edit/:id
router.patch("/edit/:id", roleController.edit);

//# [GET] /admin/roles/permission
router.get("/permission", roleController.edit);

//# [PATHC] /admin/roles/aupdate
router.patch("/update", roleController.updateRole);

module.exports = router;
