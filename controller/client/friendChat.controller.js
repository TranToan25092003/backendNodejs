const userModel = require("../../model/user.model");
const socket = require("../../socket/client/friend.socket");

//# [GET] /users/not-friend
module.exports.ListRelate = async (req, res) => {
  //get all user except self and friend in list request friend
  const myId = res.locals.user.id;

  socket.friend(res); // call socket

  const myInfor = await userModel.findOne({
    _id: myId,
  });

  const myRequest = myInfor.requestFriend; // list request friend
  const myAccept = myInfor.acceptFriend; // list accept friend

  const user = await userModel
    .find({
      $and: [
        { _id: { $ne: myId } },
        { _id: { $nin: myRequest } },
        { _id: { $nin: myAccept } },
      ],
      status: "active",
      deleted: false,
    })
    .select("avartar fullName");
  //end get all user

  res.render("client/pages/FriendChat/not-friend.pug", {
    user: user,
  });
};

//# [GET] http://localhost:3000/users/request
module.exports.cancelRequest = async (req, res) => {
  //get all user except self and friend in list request friend
  const myId = res.locals.user.id;

  socket.friend(res); // call sockets

  const myInfor = await userModel.findOne({
    _id: myId,
  });

  const requestFriend = myInfor.requestFriend;

  const inforRequestFriend = await userModel
    .find({
      _id: { $in: requestFriend },
      status: "active",
      deleted: "false",
    })
    .select("id fullName avartar");
  //end get user

  res.render("client/pages/FriendChat/request.pug", {
    friend: inforRequestFriend,
  });
};

//# [GET] http://localhost:3000/users/accept
module.exports.accept = async (req, res) => {
  //get all user except self and friend in list request friend
  const myId = res.locals.user.id;

  socket.friend(res); // call sockets

  const myInfor = await userModel.findOne({
    _id: myId,
  });

  const acceptFriend = myInfor.acceptFriend;

  const inforAccept = await userModel
    .find({
      _id: { $in: acceptFriend },
      status: "active",
      deleted: "false",
    })
    .select("id fullName avartar");
  //end get user

  res.render("client/pages/FriendChat/accept.pug", {
    friend: inforAccept,
  });
};
