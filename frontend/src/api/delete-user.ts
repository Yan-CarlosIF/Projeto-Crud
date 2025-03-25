import { User } from "../@types/user";
import { api } from "../lib/axios";

export async function deleteUser({ id }: User) {
  await api.delete(`/${id}`);
}
