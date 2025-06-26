import type { CommonCode } from "~/modules/common-code/types";

export async function fetchCommonCodeList(
  groupCode: string,
): Promise<CommonCode[] | undefined> {
  try {
    const result = await $fetch<CommonCode[]>(
      "http://localhost:8000/common-code",
      {
        method: "GET",
        params: {
          code: groupCode,
        },
      },
    );
    console.log("result: ", result);
    return result;
  } catch (e) {
    console.error(e);
    alert("팀코드 목록을 가져오는 중 에러 발생");
  }
}
