export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  // auth 플러그인이 먼저 실행되어 사용자 인증 상태를 설정한다.
  // 미들웨어는 그저 저장된 상태를 확인하기만 하면 된다.
  // 로딩이 끝나고 사용자가 여전히 없다면 로그인 페이지로 리디렉션한다.
  if (!auth.isLoading && !auth.user) {
    // 사용자를 리디렉션하기 전에 무한 루프에 빠지지 않도록 확인한다.
    if (to.path !== "/") {
      console.log("인증되지 않은 사용자, 홈으로 리디렉션합니다.");
      return navigateTo("/");
    }
  }
});
