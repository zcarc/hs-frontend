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
      <!--      <div class="form-row">-->
      <!--        <label class="form-label" for="author">작성자</label>-->
      <!--        <input-->
      <!--          id="author"-->
      <!--          v-model="author"-->
      <!--          type="text"-->
      <!--          class="form-input"-->
      <!--          placeholder="작성자를 입력하세요"-->
      <!--          required-->
      <!--        />-->
      <!--      </div>-->
      <!--      <div class="form-row">-->
      <!--        <label class="form-label" for="category">카테고리</label>-->
      <!--        <select id="category" v-model="category" class="form-input">-->
      <!--          <option value="공지">공지</option>-->
      <!--          <option value="업무">업무</option>-->
      <!--          <option value="자유">자유</option>-->
      <!--        </select>-->
      <!--      </div>-->
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const title = ref("");
const author = ref("");
const category = ref("공지");
const content = ref("");
const router = useRouter();

const auth = useAuthStore(); // 2. pinia에서 user 상태 가져오기

async function submit() {
  // alert(
  //   `[임시] 등록됨\n제목: ${title.value}\n작성자: ${author.value}\n카테고리: ${category.value}\n내용: ${content.value}`,
  // );
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    await $fetch("http://localhost:8000/post", {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
        userId: auth.user.userId,
      },
      // credentials: "include", // 백엔드가 인증 필요하면 추가
    });
    await router.push("/board");
  } catch (e: any) {
    alert("등록 실패: " + (e?.data?.message || e.message));
  }
}
</script>

<style scoped src="./index.css"></style>
