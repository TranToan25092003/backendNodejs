const mongoose = require("mongoose");
const randomToken = require("../helper/generate.helper");
const { Timestamp } = require("mongodb");
const chatSchema = new mongoose.Schema(
  {
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

//# create model cart (name, shcema, collection name)
const Chat = mongoose.model("chat", chatSchema, "chat");

//# export model
module.exports = Chat;
