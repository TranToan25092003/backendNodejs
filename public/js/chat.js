import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

//FileUploadWithPreview
const upload = new FileUploadWithPreview.FileUploadWithPreview("uploadImage", {
  multiple: true,
  maxFileCount: 6,
});

//end

// auto scroll chat to bottom
const body = document.querySelector(".box-body");
if (body) {
  body.scrollTop = body.scrollHeight; // scroll to bottom
}
//end

// client send message
const form = document.querySelector("[formSubmit]");
if (form) {
  // send message
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.message.value; // get content client send
    const images = upload.cachedFileArray ? upload.cachedFileArray : []; // get images upload

    if (content || images.length > 0) {
      // send message to server
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images,
      }); // send to server
      e.target.elements.message.value = ""; // set message to empty
      upload.resetPreviewPanel(); // clear all selected images
      socket.emit("CLIENT_TYPING", "stopTyping"); // remove immeditaly typing animation
    }
  });
}
//end

//server return message
socket.on("SERVER_RETURN_DATA", (data) => {
  // insert content
  const body = document.querySelector(".box-body"); // get body html
  const div = document.createElement("div"); // get div
  div.classList.add("direct-chat-msg"); // add class
  const idUser = body.getAttribute("idUser"); // check iduser
  idUser == data.userId ? div.classList.add("right") : "";

  let htmlDefault = `
    <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">${
      idUser == data.userId ? " " : data.fullName
    }</span><span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span></div>
  <img class="direct-chat-img" src="${
    idUser == data.userId
      ? "https://bootdey.com/img/Content/user_2.jpg"
      : "https://bootdey.com/img/Content/user_1.jpg"
  }" alt="Message User Image">
  `;

  let htmlContent = ""; // html content
  let htmlImage = `<div class="inner-images" style="text-align: ${
    // imgae cotent
    idUser == data.userId ? "right" : "left"
  }">  
  `; // html images

  // if content exist
  if (data.content) {
    htmlContent = `<div class="direct-chat-text">${data.content}</div>`;
  }

  //if images exist
  if (data.images.length > 0) {
    for (const img of data.images) {
      htmlImage += `<img src="${img}" alt="" style="width: 200px; height: auto">`; // add img
    }
    htmlImage += "</div>";
  }

  // add all element into div
  div.innerHTML = ` 
 ${htmlDefault}
 ${htmlContent}
 ${htmlImage}
 `;

  const listTyping = document.querySelector(".inner-list-typing"); // list Typing

  body.insertBefore(div, listTyping); // add child before list typing

  body.scrollTop = body.scrollHeight; // scroll to bottom
  //end
});
//end

// handle button emoji
const buttonEmoji = document.querySelector("[emojiBtn]"); // get button emoji

if (buttonEmoji) {
  const tooltip = document.querySelector("[tooltip]");
  Popper.createPopper(buttonEmoji, tooltip);

  buttonEmoji.onclick = () => {
    // show emoji table
    tooltip.classList.toggle("shown");
  };
}
//end

// handle smooth animation typing
let timeout;
function handleSmoothAmbinationTyping() {
  // ambination typing
  // send event typing to server
  socket.emit("CLIENT_TYPING", "isTyping");

  clearTimeout(timeout); // clear timeout

  // stop typing
  timeout = setTimeout(() => {
    socket.emit("CLIENT_TYPING", "stopTyping");
  }, 1500);
  //end
}
//end

// typing emoji
// document
//   .querySelector("emoji-picker")
//   .addEventListener("emoji-click", (event) => console.log(event.detail));
const emoji = document.querySelector("emoji-picker");
if (emoji) {
  const input = document.querySelector("[inputText]");
  emoji.addEventListener("emoji-click", (event) => {
    // add emoji
    const icon = event.detail.emoji.unicode;
    input.value += icon; // insert emoji to input
    input.focus(); // focus to input
    input.setSelectionRange(input.value.length, input.value.length); // go to tail of the input
    handleSmoothAmbinationTyping(); // add abination
  });

  // handle user is typing message

  //# we are typing

  input.addEventListener("keydown", () => {
    // send event typing to server
    handleSmoothAmbinationTyping(); // add abination
  });

  //# someone typing
  const listTyping = document.querySelector(".inner-list-typing"); // get div typing to insert childe

  if (listTyping) {
    socket.on("SERVER_SOMEONE_TYPING", (data) => {
      // add event for catch action
      //# is typing
      if (data.action == "isTyping") {
        // {userId: '668965d3d5453f62169a5c57', fullName: 'blyat'}
        const existBoxtyping = listTyping.querySelector(
          // get element exist
          `[userid="${data.userId}"]`
        );

        // if not exist then add new animation typing
        if (!existBoxtyping) {
          // add abination typing to frontend
          const typingDiv = document.createElement("div"); // create div
          typingDiv.classList.add("box-typing"); // set class
          typingDiv.setAttribute("userId", data.userId);
          typingDiv.innerHTML = `
      <div class="inner-name">${data.fullName} </div>
        <div class="inner-dots">
          <span> </span>
          <span> </span>
          <span></span>
        </div>
      `;
          listTyping.appendChild(typingDiv); // add element
          body.scrollTop = body.scrollHeight; // scroll to bottom
          //end
        }
      } else {
        //# stop typing
        const elementTypingRemove = listTyping.querySelector(
          // get element need remove
          `[userid="${data.userId}"]`
        );

        if (elementTypingRemove) {
          // if exist then remove
          listTyping.removeChild(elementTypingRemove);
        }

        body.scrollTop = body.scrollHeight; // scroll to bottom
      }
    });
  }

  //end
}
//end

// zoome image
const imagePreview = document.querySelector(".box-body");
if (imagePreview) {
  const gallery = new Viewer(imagePreview);
}
//end zoom image
