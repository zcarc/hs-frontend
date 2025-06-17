import { useAuthStore } from "~/stores/auth";

export async function useAuthApi<T>(
  requestUrl: string,
  options: RequestOptions = {},
): Promise<T> {
  const auth = useAuthStore();

  try {
    return await $fetch(requestUrl, {
      ...options,
      credentials: "include",
    });
  } catch (e: any) {
    const errorCode = e?.response?._data?.code;
    console.log("errorCode: ", errorCode);
    if (
      errorCode === "UNAUTHORIZED_ACCESS_TOKEN" ||
      errorCode === "NOT_FOUND_ACCESS_TOKEN"
    ) {
      await auth.tryRefresh();
      alert("게시글 작성에 실패했습니다.");
    } else {
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
    return false;
  }
}

interface RequestOptions {
  method: string;
  credentials: string;
  headers: {
    [key: string]: string;
  };
}
