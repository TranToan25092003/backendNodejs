const mongoose = require("mongoose");
const randomToken = require("../helper/generate.helper");
const { Timestamp } = require("mongodb");
const UserSchema = new mongoose.Schema(
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
    listFriend: {
      // list friends were accepted
      userId: String,
      roomChatId: String,
    },
    acceptFriend: Array, // list friend wait for accept
    requestFriend: Array, // list friend we send request add
    status: {
      type: String,
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//# create model cart (name, shcema, collection name)
const user = mongoose.model("user", UserSchema, "user");

//# export model
module.exports = user;
