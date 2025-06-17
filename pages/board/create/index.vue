<template>
  <div class="board-container">
    <h1 class="board-title">글쓰기</h1>
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
        <button type="submit" class="btn-submit">등록</button>
      </div>
    </form>

    <!--    <div class="form-row">-->
    <!--      <label class="form-label" for="title">제목</label>-->
    <!--      <input-->
    <!--        id="title"-->
    <!--        v-model="title"-->
    <!--        type="text"-->
    <!--        class="form-input"-->
    <!--        placeholder="제목을 입력하세요"-->
    <!--        required-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="form-row">-->
    <!--      <label class="form-label" for="content">내용</label>-->
    <!--      <textarea-->
    <!--        id="content"-->
    <!--        v-model="content"-->
    <!--        class="form-input"-->
    <!--        rows="8"-->
    <!--        placeholder="내용을 입력하세요"-->
    <!--      ></textarea>-->
    <!--    </div>-->
    <!--    <div class="board-toolbar">-->
    <!--      <button class="btn-submit" @click="submit">등록</button>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composable/useAuthApi";

const title = ref("");
const content = ref("");
const router = useRouter();

const auth = useAuthStore();

async function submit() {
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  const result = await useAuthApi("http://localhost:8000/post", {
    method: "POST",
    body: {
      title: title.value,
      content: content.value,
    },
  });
  if (result) {
    await router.push("/board");
  }

  // try {
  //   await $fetch("http://localhost:8000/post", {
  //     method: "POST",
  //     body: {
  //       title: title.value,
  //       content: content.value,
  //       userId: auth.user.userId,
  //     },
  //     credentials: "include",
  //   });
  //   await router.push("/board");
  // } catch (e: any) {
  //   console.error(e?.data?.message || e.message);
  //
  //   showError({
  //     statusCode: e?.statusCode || 500,
  //     message: e?.data?.message || e.message || "서버 오류가 발생했습니다.",
  //   });
  // }
}
//
// definePageMeta({
//   middleware: "auth-guard",
// });
</script>

<style scoped src="./index.css"></style>
