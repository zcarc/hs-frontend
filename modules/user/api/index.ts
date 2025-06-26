import type { User } from "~/modules/user/types";

export async function fetchAllUsers() {
  return await $fetch<User[]>("http://localhost:8000/user");
}

export async function fetchAllUsersByTeamId(teamId: number) {
  return await $fetch<User[]>("http://localhost:8000/user/all/query", {
    params: { teamId },
  });
}
