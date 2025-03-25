import { User } from "../@types/user";
import { api } from "../lib/axios";

export async function updateUser(user: User) {
  await api.put(`/${user.id}`, user);
}
