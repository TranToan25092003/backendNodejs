"use strict";

const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./Search.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const userRouter = require("./user.router");
const chatRouter = require("./chat.router");
const friendChatRouter = require("./friendChat.router");

const middleware = require("../../middleware/client/category.middleWare");
const cartMiddleware = require("../../middleware/client/cart.middleWare");
const login = require("../../middleware/client/login.middleWare");
const settingMiddle = require("../../middleware/client/setting.middleWare");
const authenMiddle = require("../../middleware/client/authen.middleWare");
module.exports = (app) => {
  // always go through this middleware
  app.use(settingMiddle.getSetting);
  app.use(middleware.category);
  app.use(cartMiddleware.CartId);
  app.use(login.login);
  //end

  app.use("/", homeRouter);

  app.use("/product", productRouter);

  app.use("/search", searchRouter);

  app.use("/cart", cartRouter);

  app.use("/checkout", checkoutRouter);

  app.use("/user", userRouter);

  app.use("/chat", authenMiddle.requireAuth, chatRouter);

  app.use("/users", authenMiddle.requireAuth, friendChatRouter);
};
