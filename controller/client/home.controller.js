"use strict";

//# [GET] /
module.exports.renderHomePage = (req, res) => {
  res.render("client/pages/home/index.pug", { title: "home page" });
};
