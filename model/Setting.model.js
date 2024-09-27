const mongoose = require("mongoose");

//# create a schema for product
const SettingShcema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyRight: String,
  },
  { timestamps: true }
);

//# create model Setting (name, schema, collection name)
const Setting = mongoose.model("setting", SettingShcema, "setting");

//# export model
module.exports = Setting;
