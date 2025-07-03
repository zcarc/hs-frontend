<template>
  <div class="board-container">
    <h1 class="board-title">결재 목록</h1>
    <div class="board-toolbar">
      <select v-model="filterStatus" class="board-toolbar-select">
        <option value="all">전체상태</option>
        <option value="submitted">상신대기</option>
        <option value="in_progress">진행중</option>
        <option value="completed">완료</option>
        <option value="rejected">반려</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="제목/기안자 검색"
        class="board-search"
      />
      <template v-if="auth.user">
        <NuxtLink to="/approval/create">
          <Button>새 결재 작성</Button>
        </NuxtLink>
      </template>
    </div>

    <div class="approval-list-header">
      <span class="col-no">번호</span>
      <span class="text-left pl-2">제목</span>
      <span class="col-author">상태</span>
      <span class="col-author">기안자</span>
      <span class="col-date">기안일</span>
    </div>
    <div v-if="approvalDocuments.length > 0" class="board-list">
      <div
        v-for="(item, index) in approvalDocuments"
        :key="item.id"
        class="board-list-row"
      >
        <span class="col-no">{{ no - index }}</span>
        <NuxtLink :to="`/approval/${item.id}`">
          <span class="col-title cursor-pointer">{{ item.title }}</span>
        </NuxtLink>
        <span class="col-author">{{ item.drafter.name }}</span>
        <span class="col-date">{{ formatDate(item.createdAt) }}</span>
        <span class="col-author">{{ item.status }}</span>
      </div>
    </div>
    <div v-else class="board-empty">전자결재 문서가 없습니다.</div>

    <CustomPagination class="mt-10" :limit="meta.limit" :total="meta.total" />
  </div>
</template>

<script setup lang="ts">
import {
  type ApprovalDocument,
  type GetApprovalDocumentData,
} from "~/modules/approval/types";

const auth = useAuthStore();

const approvalDocuments = ref<ApprovalDocument[]>([]);
const meta = ref({ total: 0, page: 1, limit: 10 });
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const no = computed(
  () => meta.value.total - (page.value - 1) * meta.value.limit,
);

const search = ref("");
const filterStatus = ref("all");

async function getData(page: number = 1, limit: number = 10) {
  try {
    return await $fetch<GetApprovalDocumentData>(
      "http://localhost:8000/approval",
      {
        params: {
          page,
          limit,
        },
      },
    );
  } catch (e) {
    alert("목록 요청 실패");
  }
}

// function getStatusLabel(status: ApprovalDocumentStatusEnum) {
//   return ApprovalDocumentStatusLabel[status];
// }

watchEffect(async () => {
  const res = await getData(page.value, meta.value.limit);
  if (res) {
    approvalDocuments.value = res.approvalDocuments;
    meta.value.limit = res.meta.limit;
  }
});

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10);
}
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
<style scoped>
.approval-list-header {
  display: grid;
  grid-template-columns: 60px 1fr 60px 100px 120px;
  align-items: center;
  padding: 8px 0;

  background: #f7fafc;
  border-radius: 6px;
  font-size: 1rem;
  color: #555;
  font-weight: 600;
  margin-bottom: 5px;
  border: 1px solid #eee;
  padding-left: 12px;
  padding-right: 12px;
}
</style>
