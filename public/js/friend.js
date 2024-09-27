// send request add friend
const addFriendBtn = document.querySelectorAll("[add-friend-btn]");
if (addFriendBtn.length > 0) {
  addFriendBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idFriend = btn.getAttribute("add-friend-btn");
      const parentBtn = btn.closest(".card");
      parentBtn.classList.add("add");

      socket.emit("ADD_NEW_FRIEND", idFriend);
    });
  });
}
//end send request add friend

// cancel request
const cancelFriendBtn = document.querySelectorAll("[cancel-friend-btn]");
if (cancelFriendBtn.length > 0) {
  cancelFriendBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idFriend = btn.getAttribute("cancel-friend-btn");

      const parentBtn = btn.closest(".card");

      parentBtn.classList.remove("add");
      socket.emit("CANCEL_FRIEND", idFriend);
    });
  });
}
//end

// refuse a user

const refuseBtn = document.querySelectorAll("[btn-refuse-friend]");
if (refuseBtn.length > 0) {
  refuseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idFriend = btn.getAttribute("btn-refuse-friend");

      const parentBtn = btn.closest(".card");
      parentBtn.classList.remove("refuse");
      socket.emit("REFUSE_FRIEND", idFriend);
    });
  });
}
//end refuse a user

// accept friend
const acceptBtn = document.querySelectorAll("[btn-accept-friend]");
if (acceptBtn.length > 0) {
  acceptBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idFriend = btn.getAttribute("btn-accept-friend");

      const parentBtn = btn.closest(".card");
      parentBtn.classList.remove("refuse");
      parentBtn.classList.add("accepted");

      socket.emit("ACCEPT_FRIEND", idFriend);
    });
  });
}

//end accept friend
