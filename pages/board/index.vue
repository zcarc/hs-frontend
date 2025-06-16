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
        <Button>
          <NuxtLink to="/board/create"> 글쓰기</NuxtLink>
        </Button>
      </template>
    </div>
    <div class="board-list-header">
      <span class="col-no">번호</span>
      <span class="col-title">제목</span>
      <span class="col-author">작성자</span>
    </div>
    <template v-if="isLoading === false">
      <div v-if="posts.length > 0" class="board-list">
        <div v-for="post in posts" :key="post.id" class="board-list-row">
          <span class="col-no">{{ post.id }}</span>
          <NuxtLink :to="`/board/${post.id}`">
            <span class="col-title cursor-pointer">{{ post.title }}</span>
          </NuxtLink>
          <span class="col-author">{{ post.author.name }}</span>
        </div>
      </div>
      <div v-else class="board-empty">게시글이 없습니다.</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { GetPost } from "~/types/post";

const auth = useAuthStore();

const { data: posts, pending: isLoading } = await useAsyncData<GetPost[]>(
  "posts",
  () => $fetch("http://localhost:8000/post"),
);

const search = ref("");
</script>

<style scoped src="./index.css"></style>
