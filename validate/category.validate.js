module.exports.validateInput = (req, res, next) => {
  if (!req.body.title || req.body.title.length < 5) {
    req.flash("error", "Invalid title");
    res.redirect("back");
    return;
  }
  next();
};
