<template>
  <div class="board-container">
    <h1 class="board-title">게시판</h1>
    <div class="board-toolbar">
      <input
        v-model="search"
        type="text"
        placeholder="검색어를 입력하세요"
        class="board-search"
      />
      <template v-if="auth.user">
        <NuxtLink to="/board/create">
          <Button>글쓰기</Button>
        </NuxtLink>
      </template>
    </div>
    <div class="board-list-header">
      <span class="col-no">번호</span>
      <span class="col-title">제목</span>
      <span class="col-author">작성자</span>
    </div>
    <div v-if="posts.length > 0" class="board-list">
      <div v-for="(post, index) in posts" :key="post.id" class="board-list-row">
        <span class="col-no"> {{ no - index }}</span>
        <NuxtLink :to="`/board/${post.id}`">
          <span class="col-title cursor-pointer">{{ post.title }}</span>
        </NuxtLink>
        <span class="col-author">{{ post.authorName }}</span>
      </div>
    </div>
    <div v-else class="board-empty">게시글이 없습니다.</div>
    <CustomPagination class="mt-10" :limit="meta.size" :total="meta.totalElements" />
  </div>
</template>

<script setup lang="ts">
import type { PagedResponse, PostListResponse } from "~/modules/post/types";

const auth = useAuthStore();

const posts = ref<PostListResponse[]>([]);
const meta = ref({
  totalElements: 0,
  number: 1,
  size: 10,
  totalPages: 1,
});

const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

const no = computed(
  () => meta.value.totalElements - (page.value - 1) * meta.value.size
);

async function fetchData() {
  const res = await getData(page.value, meta.value.size);
  if (res) {
    posts.value = res.content;
    meta.value = {
      totalElements: res.totalElements,
      number: res.number + 1, // 백엔드는 0-based, 프론트는 1-based
      size: res.size,
      totalPages: res.totalPages,
    };
  }
}

async function getData(page: number = 1, size: number = 10) {
  try {
    return await $fetch<PagedResponse<PostListResponse>>("/api/posts", {
      params: {
        page: page - 1, // 프론트는 1-based, 백엔드는 0-based
        size,
      },
    });
  } catch (e) {
    console.error("목록 요청 실패:", e);
  }
}

watch(page, fetchData, { immediate: true });

const search = ref("");
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
