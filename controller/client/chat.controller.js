const chatModel = require("../../model/chat.model");
const userModel = require("../../model/user.model");
const upload = require("../../helper/uploadCloudinary");
const socket = require("../../socket/client/chat.socket");
//# [GET] /chat
module.exports.chat = async (req, res) => {
  //get user id and fullname
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // chat
  socket.chat(res);
  //end chat

  // get chat detail
  const chats = await chatModel.find({ deleted: false });
  for (const item of chats) {
    // get user name
    const user = await userModel
      .findOne({
        _id: item.user_id,
      })
      .select("fullName");
    item.infor = user; // set infor
  }
  //end get chat detail

  res.render("client/pages/chat/index.pug", {
    chat: chats,
  });
};
