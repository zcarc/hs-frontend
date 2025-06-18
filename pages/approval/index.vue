<template>
  <Card class="w-full max-w-4xl mx-auto mt-8">
    <CardContent>
      <div class="flex flex-col gap-6">
        <!-- 헤더 -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">전자결재</h1>
          <NuxtLink to="/approval/create">
            <Button> <PlusIcon class="mr-2 h-4 w-4" /> 새 결재 작성 </Button>
          </NuxtLink>
        </div>

        <!-- 툴바 (필터/검색) -->
        <div class="flex gap-2">
          <Select v-model="filterStatus" class="w-36">
            <SelectTrigger>
              <SelectValue placeholder="전체상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체상태</SelectItem>
              <SelectItem value="진행중">진행중</SelectItem>
              <SelectItem value="상신대기">상신대기</SelectItem>
              <SelectItem value="반려">반려</SelectItem>
              <SelectItem value="완료">완료</SelectItem>
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
          class="grid grid-cols-6 font-semibold text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded"
        >
          <span class="text-center">번호</span>
          <span>제목</span>
          <span class="text-center">기안자</span>
          <span class="text-center">기안일</span>
          <span class="text-center">상태</span>
          <span class="text-center">단계</span>
        </div>

        <!-- 리스트 내용 -->
        <div v-if="docs.length" class="flex flex-col gap-0.5">
          <div
            v-for="(doc, idx) in pagedDocs"
            :key="doc.id"
            class="grid grid-cols-6 items-center px-3 py-2 rounded hover:bg-blue-50 transition"
          >
            <span class="text-center">{{ no - idx }}</span>
            <NuxtLink
              :to="`/approval/${doc.id}`"
              class="truncate text-blue-600 hover:underline"
            >
              {{ doc.title }}
            </NuxtLink>
            <span class="text-center">{{ doc.drafter }}</span>
            <span class="text-center">{{ formatDate(doc.createdAt) }}</span>
            <span class="text-center">
              <ApprovalStatusChip :status="doc.status" />
            </span>
            <span class="text-center">{{ doc.step }}</span>
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

// 하드코딩된 샘플 데이터
interface ApprovalDoc {
  id: number;
  title: string;
  drafter: string;
  createdAt: string;
  status: string;
  step: number;
}

const docs = ref<ApprovalDoc[]>([
  {
    id: 1,
    title: "휴가 신청",
    drafter: "김철수",
    createdAt: "2025-06-15",
    status: "진행중",
    step: 2,
  },
  {
    id: 2,
    title: "회의실 예약",
    drafter: "이영희",
    createdAt: "2025-06-14",
    status: "완료",
    step: 3,
  },
  {
    id: 3,
    title: "지출 결의",
    drafter: "박민수",
    createdAt: "2025-06-13",
    status: "상신대기",
    step: 1,
  },
]);

// 페이징 설정
const total = computed(() => docs.value.length);
const limit = ref(10);
const curPage = ref(1);
const no = computed(() => total.value - (curPage.value - 1) * limit.value);

// 현재 페이지 아이템
const pagedDocs = computed(() => {
  const start = (curPage.value - 1) * limit.value;
  return docs.value.slice(start, start + limit.value);
});

// 검색 및 필터용 상태
const search = ref("");
const filterStatus = ref("");

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10);
}
</script>
