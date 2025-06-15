// import type { MeResponse } from "~/stores/types";
//
// import { parseCookies, setCookie } from "h3";
//
// export default defineEventHandler(async (event) => {
//   const cookies = parseCookies(event);
//
//   console.log("cookies: ", cookies);
//
//   if (cookies.accessToken) {
//     try {
//       const me = await $fetch("http://localhost:8000/auth/me", {
//         method: "POST",
//         headers: { cookie: event.req.headers.cookie || "" },
//       });
//       event.context.user = me;
//
//       // 클라이언트와 공유 가능한 useState
//       const userState = useState("auth-user", () => null);
//       userState.value = me;
//
//       return;
//     } catch (e) {
//       // 액세스 토큰 만료 → 아래에서 refresh 시도
//     }
//   } else {
//     console.error("액세스 토큰 만료");
//   }
//
//   // if (!cookies.accessToken && cookies.refreshToken) {
//   //   const res = await $fetch<MeResponse>("http://localhost:8000/auth/refresh", {
//   //     method: "POST",
//   //     headers: { cookie: event.req.headers.cookie || "" },
//   //     credentials: "include",
//   //   });
//   //
//   //   setCookie(event, "accessToken", res.accessToken, {
//   //     httpOnly: true,
//   //     maxAge: 5 * 1000,
//   //   });
//   //
//   //   event.context.user = {
//   //     userId: res.userId,
//   //     name: res.name,
//   //   };
//   // }
// });
