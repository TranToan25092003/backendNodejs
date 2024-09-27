const mongoose = require("mongoose");
const randomToken = require("../helper/generate.helper");
const AccountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: randomToken.randomString(30),
    },
    phone: String,
    avartar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//# create model product (name, shcema, collection name)
const Account = mongoose.model("account", AccountSchema, "account");

//# export model
module.exports = Account;
