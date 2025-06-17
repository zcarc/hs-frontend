export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (import.meta.server) {
    const headers = useRequestHeaders(["cookie"]);
    const cookie = headers.cookie;
    if (!cookie) {
      return navigateTo("/");
    }
    const success = await auth.me(cookie);
    console.log("server success: ", success);
    if (!success) {
      return navigateTo("/");
    }
  } else if (import.meta.client) {
    const success = await auth.me();
    console.log("client success: ", success);
    if (!success) {
      return navigateTo("/");
    }
  }
});
