export default defineNuxtPlugin(async () => {
  console.log("[auth.client.ts] 플러그인 호출됨 (클라이언트)");

  const auth = useAuthStore();

  await auth.me("");
});
