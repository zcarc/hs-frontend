import { defineStore } from "pinia";
import type { LoginPayload, LoginResponse, UserState } from "~/stores/types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | UserState,
    accessToken: null as string | null,
    isLoading: true,
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
      this.accessToken = res.accessToken;
      this.isLoading = false;
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
        this.accessToken = null;
        this.isLoading = false;

        navigateTo("/");
      } else {
        alert("로그아웃 시도 중 오류가 발생했습니다.");
      }
    },
    getAccessTokenHeader() {
      return this.accessToken
        ? { Authorization: `Bearer ${this.accessToken}` }
        : null;
    },
  },
});
