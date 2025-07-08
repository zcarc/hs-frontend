import { useAuthStore } from "~/stores/auth";

export async function useAuthApi<T>(requestUrl: string, options: {} = {}) {
  const auth = useAuthStore();

  try {
    return await $fetch<T>(requestUrl, {
      ...options,
      credentials: "include",
    });
  } catch (e: any) {
    const errorCode = e?.response?._data?.code;
    console.log("useAuthApi e: ", e);
    if (
      errorCode === "UNAUTHORIZED_ACCESS_TOKEN" ||
      errorCode === "NOT_FOUND_ACCESS_TOKEN"
    ) {
      await auth.tryRefresh();
      alert("요청 실패 다시 시도해주세요.");
    } else {
      alert("요청 중 오류가 발생했습니다.");
    }
    return false;
  }
}
