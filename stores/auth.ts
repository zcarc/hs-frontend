import { defineStore } from "pinia";

interface UserState {
  userId: string;
  name: string;
}

interface LoginPayload {
  userId: string;
  password: string;
}

interface LoginResponse {
  userId: string;
  name: string;
  accessToken: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | UserState,
    isLoggedIn: false,
    accessToken: "",
  }),
  actions: {
    async login({ userId, password }: LoginPayload) {
      const res: LoginResponse = await $fetch(
        "http://localhost:8000/auth/login",
        {
          method: "POST",
          body: { userId, password },
          credentials: "include",
        },
      );
      this.user = { userId: res.userId, name: res.name };
      this.isLoggedIn = true;
    },
    async logout() {
      if (this.user?.userId) {
        await $fetch("http://localhost:8000/auth/logout", {
          method: "POST",
          body: { userId: this.user.userId },
          credentials: "include",
        }).catch((e) => {
          console.error("로그아웃 요청 실패: ", e);
        });
        this.user = null;
        this.isLoggedIn = false;
        this.accessToken = "";

        navigateTo("/");
      } else {
        alert("로그아웃 시도 중 오류가 발생했습니다.");
      }
    },
  },
});
