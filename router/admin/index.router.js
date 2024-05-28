const renderAdmin = require("./dashboard.router");
const systemFile = require("../../config/system");
const renderProduct = require("./product.router");
module.exports = (app) => {
  app.use(systemFile.prefixAdmin + "/dashboard", renderAdmin);
  app.use(systemFile.prefixAdmin + "/product", renderProduct);
};
