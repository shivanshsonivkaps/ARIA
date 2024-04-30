"use server";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { User } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";
export const CreateUser = async ({
  name,
  email,
  phone,
  clerkId,
}: CreateUserParams) => {
  try {
    await connectToDatabase();
    console.log("after connectToDatabase");
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      clerkID: clerkId,
    });
    console.log("after create");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async () => {};
export const updateUser = async () => {};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const newCategory = await User.find();
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};
