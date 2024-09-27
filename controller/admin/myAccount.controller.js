const md5 = require("md5");
const accountSchema = require("../../model/Account.model");

//#[GET] /admin/my-account
module.exports.getInformaitonMyaccount = (req, res) => {
  res.render("admin/pages/my-account/index.pug");
};

//#[GET] /admin/my-account/edit
module.exports.editForm = (req, res) => {
  res.render("admin/pages/my-account/edit.pug");
};

//#[PATCH] /admin/my-account/edit
module.exports.editProfile = async (req, res) => {
  try {
    //check email already exist (except itseft)
    const checkEmail = await accountSchema.findOne({
      _id: { $ne: res.locals.account.id },
      email: req.body.email,
      deleted: false,
    });
    //end

    // if email not exist (back to page and send message)
    if (checkEmail) {
      req.flash("error", "account already exist");
      res.redirect("back");
      return;
    }
    //end

    // check user update password
    const password = req.body.password;
    if (password) {
      req.body.password = md5(password);
    } else {
      delete req.body.password;
    }
    //end

    // update to db and send message success
    await accountSchema.updateOne(
      {
        _id: res.locals.account._id,
      },
      req.body
    );
    //end

    req.flash("success", "successfully");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "can not update");
    res.redirect("back");
  }
};
