export const denormalize = (messages) => {
  const author = new normalizr.schema.Entity("authors");
  const mensajes = new normalizr.schema.Entity("mensajes", {
    author: author,
  });
  const chats = new normalizr.schema.Entity("chats", { chats: [mensajes] });

  const denormalizedMessages = normalizr.denormalize(
    messages.result,
    chats,
    messages.entities
  );

  return denormalizedMessages;
};
