import { defineStore } from "pinia";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  UserState,
} from "~/stores/types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | UserState,
    accessToken: "" as string | null,
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
    // getAccessTokenHeader() {
    //   return this.accessToken
    //     ? { Authorization: `Bearer ${this.accessToken}` }
    //     : null;
    // },

    async tryRefresh(cookie: string): Promise<boolean> {
      console.log("tryRefresh... ");
      try {
        const res = await $fetch<MeResponse>(
          "http://localhost:8000/auth/refresh",
          {
            method: "POST",
            credentials: "include",
            headers: { cookie },
          },
        );
        console.log("tryRefresh...  res: ", res);
        this.user = { userId: res.userId, name: res.name };
        return true;
      } catch (e: any) {
        console.error("refresh 실패: ", e);
        this.user = null;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async me(cookie: string): Promise<boolean> {
      console.log("me... isLoading: ", this.isLoading);

      this.isLoading = true;

      try {
        const res = await $fetch<MeResponse>("http://localhost:8000/auth/me", {
          method: "POST",
          credentials: "include",
          headers: { cookie },
        });

        this.user = { userId: res.userId, name: res.name };
        return true;
      } catch (e: any) {
        console.log("me 요청 실패 e: ", e);
        const responseData = e.response?._data;
        const code = responseData?.code;
        const message = responseData?.message;
        console.log("code: ", code); // 'UNAUTHORIZED_ACCESS_TOKEN'
        console.log("message: ", message); // '액세스 토큰 유효성 검증 실패'
        if (
          code === "NOT_FOUND_ACCESS_TOKEN" ||
          code === "UNAUTHORIZED_ACCESS_TOKEN"
        ) {
          return await this.tryRefresh(cookie);
        } else {
          return false;
        }
      } finally {
        this.isLoading = false;
      }
    },

    // async refreshToken() {
    //   try {
    //     const res = await $fetch<MeResponse>(
    //       "http://localhost:8000/auth/refresh",
    //       {
    //         method: "POST",
    //         credentials: "include",
    //       },
    //     );
    //
    //     this.user = { userId: res.userId, name: res.name };
    //   } catch (e) {
    //     console.log("refresh 실패, 로그인 유지 안됨 e: ", e);
    //     this.user = null;
    //     this.accessToken = null;
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
  },
});
