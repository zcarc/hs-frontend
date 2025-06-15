// import { consola } from "consola";
//
// export default defineNuxtPlugin(async (nuxtApp) => {
//   const auth = useAuthStore();
//   const url = nuxtApp.ssrContext?.event.node.req.url || "no-url";
//
//   console.log("[SSR plugin] Called at:", new Date().toISOString(), "URL:", url);
//   consola.info("[SSR plugin] auth.user:", auth.user);
//
//   const headers = useRequestHeaders(["cookie"]);
//   const cookie = headers.cookie;
//
//   if (auth.user || !cookie) {
//     auth.isLoading = false;
//     return;
//   }
//
//   const hasAccessToken = cookie.includes("accessToken");
//   const hasRefreshToken = cookie.includes("refreshToken");
//
//   // 액세스 토큰으로 me 요청 보내서 유저 정보 가져오기
//   // 액세스 토큰이 쿠키에 남아있다면 refresh 토큰으로 사용자 정보를 가져올 필요가 없음
//   if (hasAccessToken && hasRefreshToken) {
//     consola.info(
//       "[SSR plugin] 액세스 토큰과 리프레시 토큰 둘 다 쿠키에 남아있음",
//     );
//     await auth.me(cookie);
//   } else if (hasRefreshToken) {
//     await auth.refreshToken(cookie);
//   } else {
//     console.warn("[SSR plugin] Refresh, Access token not found");
//     auth.isLoading = false;
//   }
// });
