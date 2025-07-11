import { useAuthStore } from "~/stores/auth";

export async function useAuthApi<T>(
  requestUrl: string,
  options: { raw?: boolean } & Record<string, any> = {},
) {
  const auth = useAuthStore();
  const { raw, ...fetchOptions } = options;

  try {
    const fetcher = raw ? $fetch.raw : $fetch;
    return await fetcher<T>(requestUrl, {
      ...fetchOptions,
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
