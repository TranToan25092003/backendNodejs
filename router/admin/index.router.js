const systemFile = require("../../config/system");
const renderAdmin = require("./dashboard.router");
const renderProduct = require("./product.router");
const renderCategory = require("./category.router");
const renderRole = require("./Roles.router");
const renderAccount = require("./account.router");
const renderAuth = require("./auth.router");
const renderMyAccount = require("./my-account.router");
const renderSetting = require("./setting.router");
const midleWareDashboard = require("../../middleware/admin/auth.middleWare");
module.exports = (app) => {
  // /dashboard/*
  app.use(
    systemFile.prefixAdmin + "/dashboard",
    midleWareDashboard.requireAuth,
    renderAdmin
  );

  // /product/*
  app.use(
    systemFile.prefixAdmin + "/product",
    midleWareDashboard.requireAuth,
    renderProduct
  );

  // /productCategory/*
  app.use(
    systemFile.prefixAdmin + "/productCategory",
    midleWareDashboard.requireAuth,
    renderCategory
  );

  // /roles/*
  app.use(
    systemFile.prefixAdmin + "/roles",
    midleWareDashboard.requireAuth,
    renderRole
  );

  // /account/*
  app.use(
    systemFile.prefixAdmin + "/account",
    midleWareDashboard.requireAuth,
    renderAccount
  );
  app.use(systemFile.prefixAdmin + "/auth", renderAuth);

  // my-account
  app.use(
    systemFile.prefixAdmin + "/my-account",
    midleWareDashboard.requireAuth,
    renderMyAccount
  );

  // setting
  app.use(
    systemFile.prefixAdmin + "/setting",
    midleWareDashboard.requireAuth,
    renderSetting
  );
};
