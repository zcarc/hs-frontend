<template>
  <div class="board-container">
    <h1 class="board-title">결재서 작성</h1>
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
        <button type="submit" class="btn-submit">상신</button>
        <NuxtLink to="/approval">
          <button class="btn-submit">목록으로</button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composable/useAuthApi";

const title = ref("");
const content = ref("");
const status = ref("draft");

const router = useRouter();

const auth = useAuthStore();

async function submit() {
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  status.value = "submitted";
  const result = await useAuthApi("http://localhost:8000/approval", {
    method: "POST",
    body: {
      title: title.value,
      content: content.value,
      status: status.value,
    },
  });
  if (result) {
    await router.push("/approval");
  }
}
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
