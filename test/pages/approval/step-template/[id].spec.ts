import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";

// 테스트할 컴포넌트
import IdPage from "~/pages/approval/step-template/[id].vue";

// 컴포넌트가 사용하는 composable 함수들을 모킹합니다.
// useAuthApi가 실제 네트워크 요청을 보내지 않도록 설정합니다.
vi.mock("~/composable/auth", () => ({
  useAuthApi: vi.fn().mockResolvedValue({
    team: { commonCode: { name: "테스트 팀" } },
    name: "테스트 템플릿",
    approvalSteps: [],
  }),
}));

// vue-router의 함수들을 모킹합니다.
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "123" }, // 테스트용 라우트 파라미터를 제공합니다.
  }),
  useRouter: () => ({
    push: vi.fn(), // router.push 함수를 모킹합니다.
  }),
}));

describe("pages/approval/step-template/[id].vue", () => {
  it("페이지가 정상적으로 렌더링된다", async () => {
    // Arrange & Act: 컴포넌트를 마운트합니다.
    // mountSuspended는 onMounted 같은 비동기 로직을 처리해줍니다.
    const wrapper = await mountSuspended(IdPage, {
      global: {
        // Pinia 스토어를 사용하는 경우를 대비해 테스트용 Pinia를 플러그인으로 추가합니다.
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    // Assert: 컴포넌트가 존재하는지와 제목이 올바르게 렌더링되었는지 확인합니다.
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain("결재선 템플릿 상세");
  });
});
