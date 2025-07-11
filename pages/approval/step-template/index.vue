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
    <div v-if="templates.length > 0" class="board-list">
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
    </div>
    <div v-else class="board-empty">템플릿이 없습니다.</div>
    <CustomPagination class="mt-10" :limit="meta.limit" :total="meta.total" />
  </div>
</template>

<script setup lang="ts">
import type {
  ApprovalStepTemplate,
  ListApprovalTemplate,
} from "~/modules/approval/step-template/types";

const auth = useAuthStore();

const templates = ref<ApprovalStepTemplate[]>([]);
const meta = ref({
  total: 0,
  page: 1,
  limit: 10,
});

const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

const no = computed(
  () => meta.value.total - (page.value - 1) * meta.value.limit,
);

async function fetchAndSetData(pageNum: number, limitNum: number) {
  try {
    const res = await $fetch<ListApprovalTemplate>(
      "http://localhost:8000/approval-templates",
      {
        params: {
          page: pageNum,
          limit: limitNum,
        },
      },
    );
    console.log("res: ", res);
    if (res && Array.isArray(res.templates)) {
      templates.value = res.templates;
      meta.value = res.meta;
    }
  } catch (e) {
    alert("목록 요청 실패");
  }
}

onMounted(() => {
  fetchAndSetData(page.value, meta.value.limit);
});

watch(page, (newPage) => {
  fetchAndSetData(newPage, meta.value.limit);
});

const search = ref("");
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
