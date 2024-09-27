const accountSchema = require("../../model/Account.model");
const filterByStatus = require("../../helper/filterStatus.helper");
const systemConfig = require("../../config/system");
const md5 = require("md5");

//#[GET] /admin/auth/login
module.exports.loginForm = (req, res) => {
  // check if user was login (token exist)
  const token = req.cookies.token;
  if (token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    return;
  }
  //end

  res.render("admin/pages/auth/login", {
    title: "login",
  });
};

//#[POST] /admin/auth/login
module.exports.login = async (req, res) => {
  // get account data from request and find it in db
  const email = req.body.email;
  const password = req.body.password;
  const user = await accountSchema.findOne({
    email: email,
    deleted: false,
  });
  //end

  // if account not exist back to login page and send message
  if (!user) {
    req.flash("error", "email does not exist");
    res.redirect("back");
    return;
  }
  //end

  // check password is correct if not go back login page with message
  if (md5(password) != user.password) {
    req.flash("error", "Password is incorrect");
    res.redirect("back");
    return;
  }
  //end

  // check status account if in active go back login page with message
  if (user.status == "inactive") {
    req.flash("error", "Account is blockedaccount has been locked");
    res.redirect("back");
    return;
  }
  //end

  //save token user to cookie and go to further
  res.cookie("token", user.token);
  res.redirect("/admin/dashboard");
  //end
};

//#[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  // remove token user from cookie send to login page
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};
