export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (import.meta.client) {
    const success = await auth.me("");
    if (!success) {
      return navigateTo("/");
    }
  }
});
