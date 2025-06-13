import type { MeResponse } from "~/stores/types";

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();
  const url = nuxtApp.ssrContext?.event.node.req.url || "no-url";

  console.log("[SSR plugin] Called at:", new Date().toISOString(), "URL:", url);

  if (auth.user) {
    auth.isLoading = false;
    return;
  }

  console.log("meta.server...: ", import.meta.server);
  const headers = useRequestHeaders(["cookie"]);

  console.log("headers:", headers);

  const cookie = headers.cookie;
  if (!cookie) {
    return;
  }

  const hasRefreshCookie = cookie.includes("refreshToken");
  if (auth.accessToken && hasRefreshCookie) {
    try {
      const res = await $fetch<MeResponse>("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          cookie,
        },
      });
      auth.user = { userId: res.userId, name: res.name };
      auth.accessToken = res.accessToken;
      auth.isLoading = false;
    } catch (e) {
      console.log("SSR - me 요청 실패: ", e);
      auth.user = null;
      auth.accessToken = null;
      auth.isLoading = false;
    }
  }
});
