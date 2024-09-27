const userModel = require("../../model/user.model");

// check token make sure user login
module.exports.requireAuth = async (req, res, next) => {
  // check token exist if not back to login page
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "please login first");
    res.redirect("/user/signin");
    return;
  }
  // end

  // check token is valid if not back to login page else go further page
  const user = await userModel
    .findOne({
      token: token,
    })
    .select("-password");
  if (!user) {
    // account does not exist
    req.flash("error", "something wrong");
    res.redirect("/user/signin");
    return;
  }
  //end

  next();
};
