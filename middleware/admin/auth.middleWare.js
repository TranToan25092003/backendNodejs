const accountSchema = require("../../model/Account.model");
const roleschema = require("../../model/Role.model");
// check token make sure user login
module.exports.requireAuth = async (req, res, next) => {
  // check token exist if not back to login page
  const token = req.cookies.token;
  if (!token) {
    res.redirect("back");
    return;
  }
  // end

  // check token is valid if not back to login page else go further page
  const account = await accountSchema
    .findOne({
      token: token,
      deleted: false,
    })
    .select("-password");
  if (!account) {
    res.redirect("back");
    return;
  }

  // save information user to locals (role, account)
  const role = await roleschema.findOne({
    _id: account.role_id,
  });
  res.locals.role = role;
  res.locals.account = account;

  next();
};
