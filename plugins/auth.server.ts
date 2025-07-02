export default defineNuxtPlugin(async () => {
  console.log("[auth.server.ts] 플러그인 실행됨 (서버)");

  const auth = useAuthStore();
  const headers = useRequestHeaders(["cookie"]);
  const cookie = headers.cookie;

  if (!cookie) {
    console.log("서버 측에 쿠키가 없어 인증을 건너뜁니다.");
    // 쿠키가 없으면 어차피 me()가 실패하므로, 로딩 상태만 false로 변경
    auth.isLoading = false;
    return;
  }

  console.log("서버 측에서 사용자 정보를 가져옵니다.");
  await auth.me(cookie);
});
