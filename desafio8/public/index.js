const socket = io();

import { denormalize } from "./functions.js";

// socket.on("connect", () => {
//   console.log(socket.id);
// });

const button = document.getElementById("submitMessage");
button.addEventListener("click", (e) => {
  const message = {
    author: {
      id: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,    
      avatar:'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/2_avatar-256.png'
    },
    text: document.getElementById("caja-msg").value,
  };
  socket.emit("new-message", JSON.stringify(message));
  document.getElementById("caja-msg").value = "";
});

socket.on("messages", (data) => {
  let denormalizedChats = denormalize(data);
  let compression =
    (JSON.stringify(denormalizedChats).length / JSON.stringify(data).length) *
    100;


  const add = denormalizedChats.chats
    .map((chat) => {
      let time = new Date(chat.timestamp);
      let formatedTime = time
        .toISOString()
        .replace(/([^T]+)T([^\.]+).*/g, "$1 $2");
      return `
  <p>
  <span style="color: blue;">${chat.author.id}</span>
  <span style="color: brown;">[${formatedTime}]: </span>
  <span style="color: green;">${chat.text}</span>
  <img class='avatar' style="width:3rem" src='${chat.author.avatar}'></img>
  </p>
  `;
    })
    .join(" ");

  document.getElementById("div-chats").innerHTML = add;
});
