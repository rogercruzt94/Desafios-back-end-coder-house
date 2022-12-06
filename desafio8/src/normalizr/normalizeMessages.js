import { normalize, schema } from "normalizr";

const debuggChat = (messages) => {
  const arr = { id: "mensajes", chats: [] };
  arr.chats = messages.map((item) => {
    return {
      id: item._id,
      author: item.author,
      text: item.text,
      timestamp: item.timestamp,
    };
  });
  return arr;
};

export const normalizeMessages = (msj) => {
  //depuro y foramteo el char el chat
  const debuggedChat = debuggChat(msj);
  //Creo las entidades
  const author = new schema.Entity("authors");
  const mensajes = new schema.Entity("mensajes", {
    author: author,
  });
  const chats = new schema.Entity("chats", { chats: [mensajes] });
  //
  const normalizedPosts = normalize(debuggedChat, chats);

  return normalizedPosts;
};
