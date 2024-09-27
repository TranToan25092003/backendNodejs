const userModel = require("../../model/user.model");
const forgotModel = require("../../model/ForgotPassword.model");
const cartModel = require("../../model/Cart.model");
const random = require("../../helper/generate.helper");
const sendMail = require("../../helper/sendmail.helper");

const md5 = require("md5");
const user = require("../../model/user.model");
//# [/user/signup] get
module.exports.signupForm = (req, res) => {
  res.render("client/pages/user/signup.pug");
};

//# [/user/signup] post
module.exports.signup = async (req, res) => {
  //get data from client
  const email = req.body.email;
  //end

  // check account exist
  const existAccount = await userModel.findOne({
    email: email,
    deleted: false,
  });
  //end

  // already exist
  if (existAccount) {
    req.flash("error", "account already exist");
    res.redirect("back");
    return;
  }
  //end

  // endcode password
  req.body.password = md5(req.body.password);
  //end

  // create new account
  const user = new userModel(req.body);
  await user.save();
  //end

  res.cookie("token", user.token);
  res.redirect("/");
};

//# [/user/signin] get
module.exports.singinForm = (req, res) => {
  res.render("client/pages/user/signin.pug");
};

//# [/user/signin] post
module.exports.singin = async (req, res) => {
  //get data from client
  const email = req.body.email;
  //end

  // check account exist
  const existAccount = await userModel.findOne({
    email: email,
    deleted: false,
  });
  //end

  // already exist
  if (!existAccount) {
    req.flash("error", "account does not exist ");
    res.redirect("back");
    return;
  }
  //end

  // endcode password
  req.body.password = md5(req.body.password);
  //end

  // check password is correct
  if (existAccount.password != req.body.password) {
    req.flash("error", "password is incorect");
    res.redirect("back");
    return;
  }

  res.cookie("token", existAccount.token); // save token to cookie

  // save userId to cart
  const userId = existAccount.id;
  const cartId = req.cookies.cartId;
  await cartModel.updateOne(
    {
      _id: cartId,
    },
    {
      user_id: userId,
    }
  );
  //end
  res.redirect("/");

  //end
};

//# [/user/logout]
module.exports.logout = (req, res) => {
  // delete cookies token
  res.clearCookie("token");
  //end

  res.redirect("/");
};

//# GET [/user/password/forgot]
module.exports.forgotForm = (req, res) => {
  res.render("client/pages/user/forgot.pug");
};

//# POST [/user/password/forgot]
module.exports.sendOTPFogotPass = async (req, res) => {
  const email = req.body.email;
  // check email exist
  const existEmail = await userModel.findOne({
    email: email,
    deleted: false,
  });

  if (!existEmail) {
    // email does not exist
    req.flash("error", "email is not exist");
    res.redirect("back");
  }
  //end

  // create object forgot password
  const OTP = random.OTP(6);
  const objectForgotPassword = new forgotModel({
    email: email,
    OTP: OTP,
    expireAt: Date.now(),
  });
  await objectForgotPassword.save();
  //end

  // send otp here
  const subject = "Your OTP";
  const content = `Your OTP is: <b>${OTP}</b> it will be expired in 3 minutes`;
  sendMail.send(email, subject, content);
  //end

  res.redirect(`/user/password/otp?email=${email}`);
};

//# GET[/user/password/otp?email]
module.exports.otpForgotPasswordForm = (req, res) => {
  // get email
  const email = req.query.email;
  //end

  res.render("client/pages/user/otp.pug", {
    title: "Confirm OTP",
    email: email,
  });
};

//# POST [/user/password/otp?email]
module.exports.confirmOTP = async (req, res) => {
  const email = req.body.email; // get email
  const otp = req.body.otp; // get otp
  console.log(email + " " + otp);

  // check otp exist
  const theOTPExist = await forgotModel.findOne({
    email: email,
    OTP: otp,
  });
  //end

  if (!theOTPExist) {
    // otp is not exist
    req.flash("error", "otp is incorrect");
    res.redirect("back");
    return;
  }

  // get token
  const user = await userModel.findOne({
    email: email,
    deleted: false,
  });

  //end

  res.cookie("token", user.token);

  res.redirect("/user/password/reset");
  //otp exist
};

//# GET /user/password/reset
module.exports.formReset = (req, res) => {
  res.render("client/pages/user/resetPassword.pug");
};

//# GET /user/password/reset
module.exports.ResetPass = async (req, res) => {
  // get new password
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const token = req.cookies.token;
  //end

  // check password match
  if (password != cpassword) {
    // not match
    req.flash("error", "password is not match");
    res.redirect("back");
    return;
  }
  //end

  // change password
  await userModel.updateOne(
    {
      token: token,
      deleted: false,
    },
    {
      password: md5(password),
    }
  );
  //end

  req.flash("success", "change password success");
  res.redirect("/");
};

module.exports.infor = (req, res) => {
  res.render("client/pages/user/infor.pug");
};
