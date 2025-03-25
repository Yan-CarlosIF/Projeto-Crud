import { User } from "../@types/user";
import { api } from "../lib/axios";

export async function createUser(user: User) {
  await api.post("/", user);
}
