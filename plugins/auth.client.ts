import type { MeResponse } from "~/stores/types";

export default defineNuxtPlugin(async () => {
  console.log("meta.client...: ", import.meta.client);
  console.log("🔥 [auth.client.ts] 플러그인 호출됨 (클라이언트)");

  const refreshToken = useCookie("refreshToken");
  console.log("refreshToken.value: ", refreshToken.value);

  const auth = useAuthStore();

  if (auth.user && auth.accessToken) {
    console.log("✅ 이미 auth.user 있음:", auth.user);
    auth.isLoading = false;
    return;
  }

  try {
    // accessToken이 만료되었으므로 refresh 시도
    const res = await $fetch<MeResponse>("http://localhost:8000/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    auth.user = { userId: res.userId, name: res.name };
    auth.accessToken = res.accessToken;
    auth.isLoading = false;
  } catch (e) {
    console.log("CSR - refresh 실패, 로그인 유지 안됨: ", e);
    auth.user = null;
    auth.accessToken = null;
    auth.isLoading = false;
  }
});
