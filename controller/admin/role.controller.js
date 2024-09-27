const roleSchema = require("../../model/Role.model");
const systemConfig = require("../../config/system");
//# [GET]  /admin/roles
module.exports.AllRoles = async (req, res) => {
  let findCondition = {
    deleted: false,
  };
  const listRole = await roleSchema.find(findCondition);
  res.render("admin/pages/roles/index", {
    title: "Permissions",
    listRole: listRole,
  });
};

//#[GET] /admin/roles/create
module.exports.renderFormCreatRole = (req, res) => {
  res.render("admin/pages/roles/create", {
    title: "Create Role",
  });
};

//#[POST] /admin/roles/create
module.exports.createANewRole = async (req, res) => {
  const newRole = new roleSchema(req.body);
  await newRole.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

//#[GET] /admin/roles/edit/id
module.exports.renderEditForm = async (req, res) => {
  try {
    const role = await roleSchema.findOne({
      _id: req.params.id,
    });
    res.render("admin/pages/roles/edit", {
      title: "edit role",
      role: role,
    });
  } catch (error) {
    res.redirect("/admin/roles");
  }
};

//#[PATCH] /admin/roles/edit/id?_method=patch
module.exports.edit = async (req, res) => {
  await roleSchema.updateOne({ _id: req.params.id }, req.body);
  res.redirect("back");
};

//#[GET] /admin/roles/permission
module.exports.edit = async (req, res) => {
  let findCondition = {
    deleted: false,
  };
  const listRole = await roleSchema.find(findCondition);
  res.render("admin/pages/roles/permission", {
    title: "Edit permission",
    listRole: listRole,
  });
};

//#[PATCH] /admin/roles/update
module.exports.updateRole = async (req, res) => {
  const permission = JSON.parse(req.body.datPermission);
  for (const item of permission) {
    const id = item.id;
    await roleSchema.updateOne(
      { _id: id },
      {
        Permissions: item.permission,
      }
    );
  }
  req.flash("success", "update sucess");
  res.redirect("back");
};
