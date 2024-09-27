const chatModel = require("../../model/chat.model");
const userModel = require("../../model/user.model");
const upload = require("../../helper/uploadCloudinary");

module.exports.chat = async (res) => {
  //get user id and fullname
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  //end get user id and fullname

  // notification user login
  _io.once("connection", (socket) => {
    console.log("a user connected", socket.id);

    // catch event  client send to server
    // once save just one time
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      // upload image to cloud
      const images = []; // array save link url
      for (const image of data.images) {
        // upload
        const urlImg = await upload(image);
        images.push(urlImg);
      }
      //end upload

      // save message to db
      const chat = new chatModel({
        user_id: userId,
        content: data.content,
        images: images,
      });
      await chat.save();
      //end save message to db

      // send back data to receiver
      _io.emit("SERVER_RETURN_DATA", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
      });
      //end  send back data to receiver
    });

    // clietn typing message
    socket.on("CLIENT_TYPING", (action) => {
      socket.broadcast.emit("SERVER_SOMEONE_TYPING", {
        userId: userId,
        fullName: fullName,
        action: action,
      });
    });
    //end
  });
  //end

  //end
};
