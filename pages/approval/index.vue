<template>
  <Card class="w-full max-w-4xl mx-auto mt-8">
    <CardContent>
      <div class="flex flex-col gap-6">
        <!-- 헤더 -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">전자결재</h1>
          <template v-if="auth.user">
            <NuxtLink to="/approval/create">
              <Button> <PlusIcon class="mr-2 h-4 w-4" /> 새 결재 작성 </Button>
            </NuxtLink>
          </template>
        </div>

        <!-- 툴바 (필터/검색) -->
        <div class="flex gap-2">
          <Select v-model="filterStatus" class="w-36">
            <SelectTrigger>
              <SelectValue placeholder="전체상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체상태</SelectItem>
              <SelectItem value="submitted">상신대기</SelectItem>
              <SelectItem value="in_progress">진행중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="rejected">반려</SelectItem>
            </SelectContent>
          </Select>
          <Input
            v-model="search"
            placeholder="제목/작성자 검색"
            class="flex-1"
            @keyup.enter=""
          />
        </div>

        <!-- 리스트 헤더 -->
        <div
          class="grid grid-cols-5 font-semibold text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded"
        >
          <span class="text-center">번호</span>
          <span>제목</span>
          <span class="text-center">기안자</span>
          <span class="text-center">기안일</span>
          <span class="text-center">상태</span>
          <!-- <span class="text-center">단계</span> -->
        </div>

        <!-- 리스트 내용 -->
        <div v-if="approvalDocuments.length > 0" class="flex flex-col gap-0.5">
          <div
            v-for="(item, idx) in approvalDocuments"
            :key="item.id"
            class="grid grid-cols-5 items-center px-3 py-2 rounded hover:bg-blue-50 transition"
          >
            <span class="text-center">{{ no - idx }}</span>
            <NuxtLink
              :to="`/approval/${item.id}`"
              class="truncate text-blue-600 hover:underline"
            >
              {{ item.title }}
            </NuxtLink>
            <span class="text-center">{{ item.drafter.name }}</span>
            <span class="text-center">{{ formatDate(item.createdAt) }}</span>
            <span class="text-center">
              {{ getStatusLabel(item.status) }}
            </span>
            <!-- <span class="text-center">{{ item.step }}</span> -->
          </div>
        </div>
        <div v-else class="py-12 text-center text-gray-400">
          전자결재 문서가 없습니다.
        </div>

        <!-- 페이지네이션 -->
        <!-- <Pagination
          :total="total"
          :limit="limit"
          v-model:page="curPage"
          class="justify-center mt-2"
        /> -->
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { PlusIcon } from "lucide-vue-next";
import type {
  ApprovalDocument,
  GetApprovalDocumentData,
} from "~/types/approval";
import { getStatusLabel } from "~/lib/approval.lib";

const auth = useAuthStore();

const approvalDocuments = ref<ApprovalDocument[]>([]);
const meta = ref({
  total: 0,
  page: 1,
  limit: 10,
});

const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const no = computed(
  () => meta.value.total - (page.value - 1) * meta.value.limit
);

const res = await getData(page.value, meta.value.limit);
console.log("res", res);

if (res) {
  approvalDocuments.value = res.approvalDocuments;
  meta.value = res.meta;
}

async function getData(page: number = 1, limit: number = 10) {
  try {
    return await $fetch<GetApprovalDocumentData>(
      "http://localhost:8000/approval",
      {
        params: {
          page,
          limit,
        },
      }
    );
  } catch (e) {
    alert("목록 요청 실패");
  }
}

// 검색 및 필터용 상태
const search = ref("");
const filterStatus = ref("all");

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10);
}
</script>
