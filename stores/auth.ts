import { defineStore } from "pinia";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse, // SessionInfoResponse와 동일한 구조이므로 재사용 가능
  UserState,
} from "~/stores/types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | UserState,
    isLoading: true, // 앱 시작 시 항상 true, 세션 확인 후 false로 변경
  }),
  actions: {
    async login({ userId, password }: LoginPayload) {
      // 백엔드 /api/auth/login 호출, 성공 시 백엔드가 세션 쿠키를 설정해줌
      const res: LoginResponse = await $fetch("/api/auth/login", {
        method: "POST",
        body: { userId, password },
      });
      this.user = { userId: res.userId, name: res.name };
      this.isLoading = false;
    },
    async logout() {
      // 백엔드에 로그아웃 요청을 보내 세션을 무효화
      await $fetch("/api/auth/logout", {
        method: "POST",
      }).catch((e) => {
        console.error("로그아웃 요청 실패: ", e);
      });

      // 클라이언트 상태 초기화
      this.user = null;
      navigateTo("/");
    },

    /**
     * 앱 시작 시 또는 페이지 새로고침 시 호출되어
     * 백엔드에 세션 정보를 요청하고, 유효한 세션이 있다면 로그인 상태를 복원합니다.
     * @param cookie - 서버 사이드 렌더링 시 사용될 쿠키 문자열
     */
    async checkSession(
      cookie: string | undefined = undefined,
    ): Promise<boolean> {
      this.isLoading = true;
      try {
        // 서버사이드에서 실행될 경우를 대비해 헤더를 동적으로 설정
        const headers = cookie ? { cookie } : undefined;

        // 백엔드에 현재 세션 정보 요청
        const sessionInfo = await $fetch<MeResponse>("/api/auth/session", {
          method: "GET",
          headers, // 서버에서 받은 쿠키를 그대로 전달
        });

        // 성공적으로 사용자 정보를 받아오면 스토어에 저장
        if (sessionInfo && sessionInfo.userId) {
          this.user = { userId: sessionInfo.userId, name: sessionInfo.name };
          console.log(`세션 복원 성공: ${this.user.name}님`);
          return true;
        }

        this.user = null;
        return false;
      } catch (e: any) {
        // API 호출이 401 Unauthorized 등으로 실패한 경우
        console.log("세션 확인 실패. 로그인되지 않은 상태입니다.");
        this.user = null;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
