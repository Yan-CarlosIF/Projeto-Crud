import { api } from "../lib/axios";
import { User } from "../@types/user";

export async function getUsers() {
  const response = await api.get<User[]>("/");
  return response.data;
}
