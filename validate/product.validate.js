module.exports.createProduct = (req, res, next) => {
  if (!req.body.title || req.body.title.length < 8) {
    req.flash("error", "Invalid title");
    res.redirect("back");
    return;
  }
  next();
};
