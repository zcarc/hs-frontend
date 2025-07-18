<template>
  <div class="board-container">
    <h1 class="board-title">게시글 작성</h1>
    <form class="board-form" @submit.prevent="submit">
      <div class="form-row">
        <label class="form-label" for="title">제목</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div class="form-row">
        <label class="form-label" for="content">내용</label>
        <textarea
          id="content"
          v-model="content"
          class="form-input"
          rows="8"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>
      <div class="board-toolbar">
        <button type="submit" class="btn-submit">발행</button>
        <NuxtLink to="/board">
          <button class="btn-submit">목록으로</button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { PostCreateRequest } from "~/modules/post/types";

const title = ref("");
const content = ref("");
const router = useRouter();

const auth = useAuthStore();

async function submit() {
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    await $fetch("/api/posts", {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
      } as PostCreateRequest,
    });
    await router.push("/board");
  } catch (e) {
    console.error("글 작성 실패:", e);
    alert("글 작성에 실패했습니다.");
  }
}
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
