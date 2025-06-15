// import type { MeResponse } from "~/stores/types";
//
// export default defineNuxtPlugin(async (nuxtApp) => {
//   const auth = useAuthStore();
//   const user = nuxtApp.ssrContext?.event.context.user;
//
//   if (user) {
//     auth.user = user;
//     auth.isLoading = false;
//     return;
//   }
//
//   const cookie = useRequestHeaders(["cookie"]).cookie;
//
//   if (cookie?.includes("accessToken")) {
//     try {
//       const me = await $fetch<MeResponse>("http://localhost:8000/auth/me", {
//         method: "POST",
//         headers: { cookie },
//         credentials: "include",
//       });
//       auth.user = { userId: me.userId, name: me.name };
//     } catch (e) {
//       console.error("auth.server.ts me 호출 실패:", e);
//     }
//   }
// });
