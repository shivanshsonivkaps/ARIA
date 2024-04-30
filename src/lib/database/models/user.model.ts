import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  clerkID: string;
  email: string;
  phone: string;
  chatHistory: { _id: string; history: any[] };
}

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  clerkID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  chatHistory: { type: Schema.ObjectId, ref: "Chat" },
});

export const User = models.User || model("User", UserSchema);
