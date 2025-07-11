<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 목록</h1>
    <div class="board-toolbar">
      <input
        v-model="search"
        type="text"
        placeholder="검색어를 입력하세요"
        class="board-search"
      />
      <template v-if="auth.user">
        <NuxtLink to="step-template/create">
          <Button>생성</Button>
        </NuxtLink>
      </template>
    </div>
    <div class="board-list-header">
      <span class="col-no">번호</span>
      <span class="col-title">이름</span>
      <span class="col-author">작성자</span>
    </div>
    <div v-if="!isLoading" class="board-list">
      <template v-if="templates.length">
        <div
          v-for="(template, index) in templates"
          :key="template.id"
          class="board-list-row"
        >
          <span class="col-no"> {{ no - index }}</span>
          <NuxtLink :to="`step-template/${template.id}`">
            <span class="col-title cursor-pointer">{{ template.name }}</span>
          </NuxtLink>
          <span class="col-author">{{ template.creator.name }}</span>
        </div>
      </template>
      <div v-else class="board-empty">템플릿이 없습니다.</div>
    </div>

    <CustomPagination class="mt-10" :limit="meta.limit" :total="meta.total" />
  </div>
</template>

<script setup lang="ts">
import type { ListApprovalTemplate } from "~/modules/approval/step-template/types";

const auth = useAuthStore();
const route = useRoute();

const search = ref("");
const page = computed(() => Number(route.query.page) || 1);
const limit = computed(() => 10);

// useFetch를 사용하여 API 데이터를 가져옵니다.
// page computed 값이 변경되면 자동으로 다시 데이터를 가져옵니다.
const {
  data: response,
  pending: isLoading,
  error,
} = useFetch<ListApprovalTemplate>("http://localhost:8000/approval-templates", {
  params: {
    page,
    limit,
  },
});

// response가 변경될 때 안전하게 templates와 meta를 추출하는 computed 속성
const templates = computed(() => response.value?.templates || []);
const meta = computed(
  () => response.value?.meta || { total: 0, page: 1, limit: 10 },
);

// 게시물 번호를 계산하는 computed 속성
const no = computed(
  () => meta.value.total - (page.value - 1) * meta.value.limit,
);

// 데이터 페칭 중 에러가 발생하면 알림을 표시합니다.
watch(error, (newError) => {
  if (newError) {
    alert("목록 요청에 실패했습니다.");
    console.error("Error fetching approval templates:", newError);
  }
});
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
