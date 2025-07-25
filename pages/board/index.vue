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

const { data, error } = await useAsyncData<PagedResponse<PostListResponse>>(
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
</script>

<style scoped src="/modules/board/css/shared/index.css"></style>
