import { Document, Schema, model, models } from "mongoose";

export interface IChat extends Document {
  _id: string;
  chat: [];
}

const ChatSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  chat: { type: Array },
});

export const Chat = models.Chat || model("Chat", ChatSchema);
