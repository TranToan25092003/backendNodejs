const userModel = require("../../model/user.model");

module.exports.login = async (req, res, next) => {
  if (req.cookies.token) {
    // check token exist
    // get account information
    const user = await userModel
      .findOne({
        token: req.cookies.token,
        deleted: false,
      })
      .select("-password");
    //end

    //set user infor to localss
    if (user) {
      res.locals.user = user;
    }
    //end
  }
  next();
};
