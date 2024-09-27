module.exports.validateInformation = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Enter full name");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Enter email");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Enter password");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.validateEditAccount = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Enter full name");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Enter email");
    res.redirect("back");
    return;
  }

  next();
};
