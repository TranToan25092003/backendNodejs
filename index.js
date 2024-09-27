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
const path = require("path"); //to use  tinymce
const moment = require("moment");
const { Server } = require("socket.io"); // socket.io
const http = require("http"); // socket.io
const server = http.createServer(app); // socket.io

app.use(methodOverride("_method")); // method
app.use(bodyParser.urlencoded({ extended: false })); // bodyparser
app.use(cookieParser("kjsdkfjk")); // cookie
app.use(session({ cookie: { maxAge: 60000 } })); // session
app.use(flash()); // flash
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
); // tinymce

// soket.io
const io = new Server(server);
global._io = io; // set server io to global
//end

require("dotenv").config();
//#--------------------------

//# connect databases
const connectDatabase = require("./config/database");
connectDatabase.connectToDatabase();
app.use(express.static(`${__dirname}/public`)); // add dirname to deploy code online __dirname is structure of our project
const port = process.env.PORT;

//# set static and template engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//# locals variable
app.locals.prefixAdmin = config.prefixAdmin;
app.locals.moment = moment;

// //# router
clientRoute(app);
admintRoute(app);

//# 404
app.get("*", (req, res) => {
  res.render("client/pages/404/404.pug");
});

//# run express
server.listen(port, () => {
  console.log(`server is running at ${port}`);
});
