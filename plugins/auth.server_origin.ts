// import type { MeResponse } from "~/stores/types";
//
// export default defineNuxtPlugin(async (nuxtApp) => {
//   const auth = useAuthStore();
//   const url = nuxtApp.ssrContext?.event.node.req.url || "no-url";
//
//   console.log("[SSR plugin] Called at:", new Date().toISOString(), "URL:", url);
//
//   if (auth.user) {
//     auth.isLoading = false;
//     return;
//   }
//
//   console.log("meta.server...: ", import.meta.server);
//   const headers = useRequestHeaders(["cookie"]);
//
//   console.log("headers:", headers);
//
//   const cookie = headers.cookie;
//   if (!cookie) {
//     return;
//   }
//
//   const hasRefreshCookie = cookie.includes("refreshToken");
//
//   console.log("hasRefreshCookie: ", hasRefreshCookie)
//
//   if (hasRefreshCookie) {
//     await auth.me(cookie)
//   }
// });
