const user = require("../../model/user.model");
const userModel = require("../../model/user.model");

module.exports.friend = async (res) => {
  //# get user id and fullname
  const myId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  //end get user id and fullname
  console.log("my id " + myId);

  // start handle socket
  _io.once("connection", (socket) => {
    // add new friend
    socket.on("ADD_NEW_FRIEND", async (idFriend) => {
      // add A to acceptList of B
      const existAinB = await userModel.findOne({
        _id: idFriend, // check wether A is already in accept list of B
        acceptFriend: myId,
      });

      if (!existAinB) {
        await userModel.updateOne(
          // not exist already
          {
            _id: idFriend,
          },
          { $push: { acceptFriend: myId } }
        );
      }

      // add B to request list of A
      const checkBinA = await userModel.findOne({
        _id: myId, // check wether A is already in accept list of B
        requestFriend: idFriend,
      });

      if (!checkBinA) {
        await userModel.updateOne(
          // not exist already
          {
            _id: myId,
          },
          { $push: { requestFriend: idFriend } }
        );
      }
    });
    //! end add new friend

    // cancel request
    socket.on("CANCEL_FRIEND", async (idFriend) => {
      // Remove A in accept of B

      await userModel.updateOne(
        {
          _id: idFriend,
        },
        {
          $pull: { acceptFriend: myId },
        }
      );

      //end Remove A in accept of B

      // remove B in request of A

      await userModel.updateOne(
        {
          _id: myId,
        },
        {
          $pull: { requestFriend: idFriend },
        }
      );

      //end remove B in request of A
    });
    //end cancel request

    //# refuse a new friend
    socket.on("REFUSE_FRIEND", async (idFriend) => {
      // Remove A in accept of B

      const existAinB = await userModel.findOne({
        _id: myId, // check wether A is already in accept list of B
        acceptFriend: idFriend,
      });

      if (existAinB) {
        await userModel.updateOne(
          {
            _id: myId,
          },
          {
            $pull: { acceptFriend: idFriend },
          }
        );
      }

      //end Remove A in accept of B

      // remove B in request of A

      const existBinA = await userModel.findOne({
        _id: idFriend, // check wether A is already in accept list of B
        requestFriend: myId,
      });

      if (existBinA) {
        await userModel.updateOne(
          {
            _id: idFriend,
          },
          {
            $pull: { requestFriend: myId },
          }
        );
      }

      //end remove B in request of A
    });
    //! end refuse a new friend

    //# accept a friend
    socket.on("ACCEPT_FRIEND", async (idFriend) => {
      // Remove A in accept of B

      const existAinB = await userModel.findOne({
        _id: myId, // check wether A is already in accept list of B
        acceptFriend: idFriend,
      });

      if (existAinB) {
        await userModel.updateOne(
          {
            _id: myId,
          },
          {
            $push: {
              listFriend: {
                userId: idFriend,
                roomChatId: "1",
              },
            }, // add A to friend list of B and room id
            $pull: { acceptFriend: idFriend },
          }
        );
      }

      //end Remove A in accept of B

      // remove B in request of A

      const existBinA = await userModel.findOne({
        _id: idFriend, // check wether A is already in accept list of B
        requestFriend: myId,
      });

      if (existBinA) {
        await userModel.updateOne(
          {
            _id: idFriend,
          },
          {
            $push: {
              listFriend: {
                userId: myId,
                roomChatId: "1",
              },
            }, // add B to friend list of A and room id
            $pull: { requestFriend: myId },
          }
        );
      }

      //end remove B in request of A
    });
    //! end accept a friend
  });
  //end handle socket
};
