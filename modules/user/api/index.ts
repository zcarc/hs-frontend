import type { User } from "~/types/user";

export async function findAllUsers() {
  return await $fetch<User[]>("http://localhost:8000/user");
}
