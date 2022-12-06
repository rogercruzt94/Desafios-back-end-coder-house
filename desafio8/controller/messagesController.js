import mongoose from "mongoose";
import Messages from "../models/messageSchema.js";
import * as dotenv from 'dotenv'
dotenv.config();
const URL =process.env.URL_MONGO;


class MessagesController {
  constructor() {
    try {
      mongoose.connect(
        URL
      ),
        { useNewUrlParser: true };
       
    } catch (e) {
      console.log(e);
    }
  }

  async save(message) {
    try {
      let timestamp = new Date();
      message.timestamp = timestamp;
      await Messages.create(message);
      return message;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll(options) {
    try {
      let messages;
      if (options?.sort == true) {
        messages = await Messages.find({}).sort({ timestamp: -1 });
      } else {
        messages = await Messages.find({});
      }

      return messages;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

export default MessagesController;
