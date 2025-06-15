<template>
  <div class="board-container">
    <h1 class="board-title">게시판</h1>
    <div class="board-toolbar">
      <select v-model="selectedCategory">
        <option value="전체">전체</option>
        <option value="공지">공지</option>
        <option value="업무">업무</option>
        <option value="자유">자유</option>
      </select>
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
      <span class="col-date">등록일</span>
    </div>
    <div v-if="filteredPosts.length > 0" class="board-list">
      <div v-for="post in filteredPosts" :key="post.id" class="board-list-row">
        <span class="col-no">{{ post.id }}</span>
        <span class="col-title">{{ post.title }}</span>
        <span class="col-author">{{ post.author }}</span>
        <span class="col-date">{{ post.date }}</span>
      </div>
    </div>
    <div v-else class="board-empty">게시글이 없습니다.</div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { computed, ref } from "vue";

const auth = useAuthStore();

const posts = ref([
  {
    id: 3,
    title: "[공지] 6월 월간 회의 일정 안내",
    author: "관리자",
    date: "2025-06-01",
    category: "공지",
  },
  {
    id: 2,
    title: "[업무] 신규 시스템 교육 자료 업로드",
    author: "IT팀",
    date: "2025-05-30",
    category: "업무",
  },
  {
    id: 1,
    title: "[자유] 주말 등산 모임",
    author: "홍길동",
    date: "2025-05-28",
    category: "자유",
  },
]);

const selectedCategory = ref("전체");
const search = ref("");

const filteredPosts = computed(() => {
  let list = posts.value;
  if (selectedCategory.value !== "전체") {
    list = list.filter((p) => p.category === selectedCategory.value);
  }
  if (search.value.trim()) {
    list = list.filter(
      (p) => p.title.includes(search.value) || p.author.includes(search.value),
    );
  }
  return list;
});

function writePost() {
  alert("글쓰기 기능은 추후 구현 예정입니다.");
}
</script>

<style scoped src="./index.css"></style>
