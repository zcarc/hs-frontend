export default defineNuxtPlugin(async () => {
  console.log("[auth.client.ts] 플러그인 호출됨 (클라이언트)");

  const auth = useAuthStore();

  console.log("auth.isLoading: ", auth.isLoading);

  // 서버에서 이미 사용자 정보를 가져왔다면 (hydrated), 클라이언트에서 다시 호출할 필요가 없다.
  // isLoading 상태로 이를 확인할 수 있다.
  if (auth.isLoading) {
    console.log("클라이언트 측에서 사용자 정보를 다시 가져옵니다.");
    await auth.me("");
  }
});
