import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(email: string) {
  await connectDB();

  return await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");
}

export async function findUserById(id: string) {
  await connectDB();

  return await User.findById(id);
}

export async function createUser(userData: CreateUserData) {
  await connectDB();

  return await User.create({
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password,
    role: "user",
    authProvider: "credentials",
  });
}