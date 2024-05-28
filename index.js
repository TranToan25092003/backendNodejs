"use strict";
//# intialize express and import routers
const express = require("express");
const clientRoute = require("./router/client/index.router");
const admintRoute = require("./router/admin/index.router");
const config = require("./config/system");
const methodOverride = require("method-override"); // specific method exactly
const bodyParser = require("body-parser"); // get data from form
const app = express(); // server
const flash = require("express-flash"); // flash send message
const cookieParser = require("cookie-parser"); // cookie
const session = require("express-session"); // express

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("kjsdkfjk"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

require("dotenv").config();
//#--------------------------

//# connect databases
const connectDatabase = require("./config/database");
connectDatabase.connectToDatabase();
app.use(express.static(`${__dirname}/public`));
const port = process.env.PORT;

//# set static and template engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//# locals variable
app.locals.prefixAdmin = config.prefixAdmin;

// //# router
clientRoute(app);
admintRoute(app);

//# run express
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
