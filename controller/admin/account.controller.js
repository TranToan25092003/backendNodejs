const accountSchema = require("../../model/Account.model");
const roleSchema = require("../../model/Role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");

//# [GET] /admin/account
// render account list
module.exports.renderAccounts = async (req, res) => {
  const findCondition = {
    deleted: false,
  };

  // get all account (exccept  password and token)
  const listAccount = await accountSchema
    .find(findCondition)
    .select("-password -token");

  for (const item of listAccount) {
    const role = await roleSchema.findOne({
      _id: item.role_id,
      deleted: false,
    });

    item.role = role;
  }

  res.render("admin/pages/account/index", {
    listAccount: listAccount,
  });
};

//#[GET] /admin/account/create
// render form create account
module.exports.createForm = async (req, res) => {
  const listRole = await roleSchema.find({
    deleted: false,
  });
  res.render("admin/pages/account/create", {
    listRole: listRole,
  });
};

//#[POST] /admin/acocunt/create
// create account
module.exports.createAccount = async (req, res) => {
  //check account exist
  const checkEmailExist = await accountSchema.findOne({
    email: req.body.email,
  });
  if (checkEmailExist) {
    req.flash("error", `account ${req.body.email} already exist`);
    res.redirect("back");
    return;
  }
  //end echeck account exist

  // encode password and add new account to db
  req.body.password = md5(req.body.password);
  const newAccount = new accountSchema(req.body);
  await newAccount.save();
  req.flash("success", "success");
  res.redirect("back");
};

//#[GET] /admin/account/edit
module.exports.renderFormEditAccount = async (req, res) => {
  const findCondition = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const account = await accountSchema.findOne(findCondition);
    const roleList = await roleSchema.find({ deleted: false });
    res.render("admin/pages/account/edit", {
      account: account,
      roleList: roleList,
    });
  } catch (error) {
    req.flash("error", "Can not find account");
    res.redirect("back");
  }
};

//#[PATCH] /admin/account/edit
module.exports.editAccount = async (req, res) => {
  try {
    //check email already exist (except itseft)
    const checkEmail = await accountSchema.findOne({
      _id: { $ne: req.params.id },
      email: req.body.email,
      deleted: false,
    });

    // if email not exist (back to page and send message)
    if (checkEmail) {
      req.flash("error", "account already exist");
      res.redirect("back");
      return;
    }

    // update account informaiton

    // check user update password
    const password = req.body.password;
    if (password) {
      req.body.password = md5(password);
    } else {
      delete req.body.password;
    }

    // update to db and send message success
    await accountSchema.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    req.flash("success", "successfully");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "can not update");
    res.redirect("back");
  }
};
