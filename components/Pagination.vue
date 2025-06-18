<template>
  <div class="pagination">
    <button @click="changePage(1)" :disabled="page <= 1">처음</button>
    <button @click="changePage(page - 1)" :disabled="page <= 1">이전</button>

    <button
      v-for="p in pageNumbers"
      :key="p"
      :class="{ active: p === page }"
      @click="changePage(p)"
    >
      {{ p }}
    </button>

    <button @click="changePage(page + 1)" :disabled="page >= totalPages">
      다음
    </button>
    <button @click="changePage(totalPages)" :disabled="page >= totalPages">
      끝
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page || 1));
const { limit, total } = defineProps<{ limit: number; total: number }>();

const totalPages = computed(() => Math.ceil(total / limit));

// 현재 페이지 기준으로 10개 버튼 보여주기 (ex. 1~10, 11~20)
const pageNumbers = computed(() => {
  const current = page.value;
  let start = Math.max(current - 4, 1);
  const end = Math.min(start + 9, totalPages.value);
  start = Math.max(end - 9, 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

function changePage(p: number) {
  if (p < 1 || p > totalPages.value) {
    return;
  }
  router.push({ path: route.path, query: { ...route.query, page: p } });
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
}
button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
button.active {
  background: #007bff;
  color: white;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
