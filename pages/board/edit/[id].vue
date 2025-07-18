<template>
  <div class="board-container">
    <h1 class="board-title">게시글 수정</h1>
    <template v-if="isLoading === false">
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
          <NuxtLink to="/board"
            ><button class="btn-submit">목록으로</button>
          </NuxtLink>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { PostResponse, PostUpdateRequest } from "~/modules/post/types";

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();

const title = ref<string>("");
const content = ref<string>("");
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await $fetch<PostResponse>(
      `/api/posts/${route.params.id}`
    );
    title.value = res.title;
    content.value = res.content || "";
  } catch (e) {
    console.error("게시글 조회 실패:", e);
    title.value = "";
    content.value = "";
  } finally {
    isLoading.value = false;
  }
});

async function submit() {
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    await $fetch(`/api/posts/${route.params.id}`, {
      method: "PATCH",
      body: {
        title: title.value,
        content: content.value,
      } as PostUpdateRequest,
    });
    await router.push("/board");
  } catch (e) {
    console.error("글 수정 실패:", e);
    alert("글 수정에 실패했습니다.");
  }
}
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
