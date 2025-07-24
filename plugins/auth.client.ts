export default defineNuxtPlugin(async () => {
  /*
  // 기존 코드 주석 처리
  console.log("[auth.client.ts] 플러그인 호출됨 (클라이언트)");

  const auth = useAuthStore();

  console.log("auth.isLoading: ", auth.isLoading);

  // 서버에서 이미 사용자 정보를 가져왔다면 (hydrated), 클라이언트에서 다시 호출할 필요가 없다.
  // isLoading 상태로 이를 확인할 수 있다.
  if (auth.isLoading) {
    console.log("클라이언트 측에서 사용자 정보를 다시 가져옵니다.");
    await auth.me("");
  }
  */

  console.log("[auth.client.ts] 세션 확인 플러그인 실행");
  const auth = useAuthStore();

  // 스토어에 사용자 정보가 이미 있다면(예: 페이지 이동), API 호출을 생략합니다.
  if (auth.user) {
    console.log(
      "[auth.client.ts] 사용자 정보가 이미 있으므로 세션 확인을 생략합니다.",
    );
    return;
  }

  // 앱 시작 시, 서버에 세션 정보를 요청하여 로그인 상태를 복원합니다.
  await auth.checkSession();
});
