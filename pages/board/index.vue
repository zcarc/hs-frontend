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
        <span class="col-author">{{ post.author.name }}</span>
      </div>
    </div>
    <div v-else class="board-empty">게시글이 없습니다.</div>
    <Pagination class="mt-10" :limit="meta.limit" :total="meta.total" />
  </div>
</template>

<script setup lang="ts">
import type { GetPostData, Post } from "~/types/post";

const auth = useAuthStore();

const posts = ref<Post[]>([]);
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

const res = await getPosts(page.value);
console.log("res: ", res);

if (res) {
  posts.value = res.posts;
  meta.value = res.meta;
}

async function getPosts(page: number = 1, limit: number = 10) {
  try {
    return await $fetch<GetPostData>("http://localhost:8000/post", {
      params: {
        page,
        limit,
      },
    });
  } catch (e) {
    alert("게시글 요청 실패");
  }
}

watchEffect(async () => {
  const res = await getPosts(page.value, meta.value.limit);
  if (res) {
    posts.value = res.posts;
    // 아래처럼 프로퍼티만 각각 갱신
    meta.value.total = res.meta.total;
    meta.value.page = res.meta.page;
    meta.value.limit = res.meta.limit;
  }
});

// const { data, pending: isLoading } = await useAsyncData<GetPostData>(
//   "posts",
//   () =>
//     $fetch("http://localhost:8000/post", {
//       params: {
//         page: meta.value.page,
//         limit: meta.value.limit,
//       },
//     })
// );

const search = ref("");
</script>

<style scoped src="/assets/css/shared/pages/board/list.css"></style>
