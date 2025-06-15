// import type {MeResponse} from "~/stores/types";
//
// export default defineNuxtPlugin(async () => {
//     console.log("meta.client...: ", import.meta.client);
//     console.log("🔥 [auth.client.ts] 플러그인 호출됨 (클라이언트)");
//
//     const auth = useAuthStore();
//
//     console.log("auth.user: ", auth.user);
//     console.log("auth.accessToken: ", auth.accessToken);
//
//     if (auth.user && auth.accessToken) {
//         console.log("✅ 이미 auth.user 있음:", auth.user);
//         auth.isLoading = false;
//         return;
//     }
//
//     try {
//         // accessToken이 만료되었으므로 refresh 시도
//         const res = await $fetch<MeResponse>("http://localhost:8000/auth/refresh", {
//             method: "GET",
//             credentials: "include",
//         });
//
//         auth.user = {userId: res.userId, name: res.name};
//         auth.accessToken = res.accessToken;
//     } catch (e) {
//         console.log("refresh 실패, 로그인 유지 안됨 e: ", e);
//         auth.user = null;
//         auth.accessToken = null;
//     } finally {
//         auth.isLoading = false;
//     }
// });
// import type {MeResponse} from "~/stores/types";
//
// export default defineNuxtPlugin(async () => {
//     console.log("meta.client...: ", import.meta.client);
//     console.log("🔥 [auth.client.ts] 플러그인 호출됨 (클라이언트)");
//
//     const auth = useAuthStore();
//
//     console.log("auth.user: ", auth.user);
//     console.log("auth.accessToken: ", auth.accessToken);
//
//     if (auth.user && auth.accessToken) {
//         console.log("✅ 이미 auth.user 있음:", auth.user);
//         auth.isLoading = false;
//         return;
//     }
//
//     try {
//         // accessToken이 만료되었으므로 refresh 시도
//         const res = await $fetch<MeResponse>("http://localhost:8000/auth/refresh", {
//             method: "GET",
//             credentials: "include",
//         });
//
//         auth.user = {userId: res.userId, name: res.name};
//         auth.accessToken = res.accessToken;
//     } catch (e) {
//         console.log("refresh 실패, 로그인 유지 안됨 e: ", e);
//         auth.user = null;
//         auth.accessToken = null;
//     } finally {
//         auth.isLoading = false;
//     }
// });
