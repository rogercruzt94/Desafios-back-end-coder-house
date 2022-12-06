import MessagesController from "../../controller/messagesController.js";
const messagesController = new MessagesController();
import { normalizeMessages } from "../normalizr/normalizeMessages.js";

export async function chatSocket(socket, io) {
  let messages = await messagesController.getAll();
  io.sockets.emit("messages", normalizeMessages(messages));
  //queda escuchando el siguiente socket, socket es el usuario/cliente
  socket.on("new-message", async (msjClient) => {
    let message = JSON.parse(msjClient);
    await messagesController.save(message);
    let allMessages = await messagesController.getAll({ sort: true });

    io.sockets.emit("messages", normalizeMessages(allMessages));
  });
}
