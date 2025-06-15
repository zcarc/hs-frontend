export default defineNuxtPlugin(async () => {
  console.log("[auth.server.ts] 플러그인 호출됨 (서버)");

  const auth = useAuthStore();

  const headers = useRequestHeaders(["cookie"]);

  const cookie = headers.cookie;
  if (!cookie) {
    return;
  }

  await auth.me(cookie);
});
