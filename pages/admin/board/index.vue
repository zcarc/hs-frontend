<template>
  <div class="board-container">
    <h1 class="board-title">게시판 관리</h1>
    <div class="board-toolbar">
      <input
          v-model="search"
          type="text"
          placeholder="검색어를 입력하세요"
          class="board-search"
      />
      <template v-if="auth.user">
        <Button @click="create100Posts" class="ml-2">게시글 100개 생성</Button>
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
    <CustomPagination
        class="mt-10"
        :page="page"
        :limit="meta.size"
        :total="meta.totalElements"
    />
  </div>
</template>

<script setup lang="ts">
import type {PagedResponse, PostListResponse} from "~/modules/post/types";

const search = ref("");

const auth = useAuthStore();

const posts = ref<PostListResponse[]>([]);
const meta = ref({
  totalElements: 0,
  totalPages: 1,
  size: 10,
});

const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

const no = computed(
    () => meta.value.totalElements - (page.value - 1) * meta.value.size,
);

const {data, error, refresh: refreshPosts} = await useAsyncData<PagedResponse<PostListResponse>>(
    "post-list",
    () =>
        $fetch<PagedResponse<PostListResponse>>("/api/posts", {
          params: {
            page: page.value,
            size: 10,
          },
        }),
    {
      watch: [page],
      // ✅ server: true 기본이므로 생략 (유니버설)
      // ❌ definePageMeta({ ssr: true })도 생략 (기본값이므로 불필요)
    },
);

watch(
    data,
    (newData) => {
      if (newData) {
        posts.value = newData.list;
        meta.value = {
          totalElements: newData.totalElements,
          totalPages: newData.totalPages,
          size: newData.size,
        };
      }
    },
    {immediate: true},
);

if (error.value) {
  console.log(error.value);
}

async function create100Posts() {
  try {
    await $fetch('/api/posts/bulk', {method: 'POST'});
    alert('게시글 100개가 생성되었습니다.');
    await refreshPosts();
  } catch (e) {
    console.error(e);
    alert('게시글 생성에 실패했습니다.');
  }
}
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
