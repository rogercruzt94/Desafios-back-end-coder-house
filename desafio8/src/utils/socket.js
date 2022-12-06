import { chatSocket } from "./socketChat.js";

export const socketModel = (io) => {
  io.on("connection", async (socket) => {
    console.log("Nuevo Cliente Conectado: " + socket.id);
    chatSocket(socket, io);
  });
};
