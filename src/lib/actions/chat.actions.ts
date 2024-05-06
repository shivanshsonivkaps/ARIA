"use server";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { User } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";
import { Chat } from "../database/models/chat.model";
import axios from "axios";
export const createChat = async ({
  question,
  session,
}: {
  question: string;
  session: string;
}) => {
  try {
    // await connectToDatabase();
    // const newCategory = await User.create({
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   clerkID: clerkId,
    // });
    // return JSON.parse(JSON.stringify(newCategory));

    const res = await axios.post(
      process.env.PYTHON_API_URL!,
      { question: question, thread: session },
      {
        auth: {
          username: process.env.API_USERNAME!,
          password: process.env.API_PASSWORD!,
        },
        timeout: 25000,
      }
    );
    if (!res) {
      return {
        req: question,
        res: "Something went wrong. Please try again.",
      };
    }
    const ans = res.data.answer;

    return {
      req: question,
      res: ans,
    };
  } catch (error) {
    // handleError(error);
    console.log(error);
    return {
      req: question,
      res: "Something went wrong. Please try again.",
    };
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
