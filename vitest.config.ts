import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    // Vitest의 다른 설정을 여기에 추가할 수 있습니다.
    globals: true,
    environment: "nuxt", // Nuxt 환경을 사용하도록 설정합니다.
  },
});
