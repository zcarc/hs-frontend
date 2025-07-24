export default defineNuxtPlugin(async () => {
  console.log("[auth.server.ts] 서버 플러그인 실행");

  const auth = useAuthStore();
  const headers = useRequestHeaders(["cookie"]);

  // 서버 요청에 쿠키가 포함되어 있다면, 해당 쿠키를 사용하여 세션 확인을 시도합니다.
  if (headers.cookie) {
    console.log("[auth.server.ts] 쿠키를 사용하여 세션 정보를 요청합니다.");
    await auth.checkSession(headers.cookie);
  } else {
    // 쿠키가 없으면 API를 호출할 필요 없이 로딩 상태만 완료 처리합니다.
    console.log("[auth.server.ts] 쿠키가 없어 인증을 건너뜁니다.");
    auth.isLoading = false;
  }
});
