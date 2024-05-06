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
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      clerkID: clerkId,
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id: string) => {};
export const updateUser = async (id: string, user: any) => {};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const newCategory = await User.find();
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};
