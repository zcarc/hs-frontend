export default defineNuxtRouteMiddleware((to, from) => {
  // 이 미들웨어는 클라이언트 측에서만 실행되어야 합니다.
  if (process.server) return;

  const authStore = useAuthStore();
  const user = authStore.user;

  // 백엔드에서 실제 사용자 역할(role) 정보를 받아와야 합니다.
  // 우선 임시로 사용자 이름이 'admin'인 경우를 관리자로 간주하겠습니다.
  // TODO: 실제 사용자 역할(role) 기반으로 로직을 수정해야 합니다.
  const isAdmin = user?.name === 'admin';

  if (!isAdmin) {
    console.warn('관리자 권한이 없습니다. 홈페이지로 이동합니다.');
    return navigateTo('/');
  }
});
