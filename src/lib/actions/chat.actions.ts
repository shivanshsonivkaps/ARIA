"use server";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { User } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";
import { Chat } from "../database/models/chat.model";
export const createChat = async ({
  name,
  email,
  phone,
  clerkId,
}: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newCategory = await User.create({
      name: name,
      email: email,
      phone: phone,
      clerkID: clerkId,
    });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllChats = async () => {
  try {
    await connectToDatabase();
    const newCategory = await Chat.find();
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};
