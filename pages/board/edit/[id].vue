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
import { useAuthApi } from "~/composable/useAuthApi";
import type { Post } from "~/types/post";

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();

const title = ref("");
const content = ref("");
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await $fetch<Post>(
      `http://localhost:8000/post/${route.params.id}`
    );
    title.value = res.title;
    content.value = res.content || "";
  } catch (e) {
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

  const result = await useAuthApi(
    `http://localhost:8000/post/${route.params.id}`,
    {
      method: "PATCH",
      body: {
        title: title.value,
        content: content.value,
      },
    }
  );
  if (result) {
    await router.push("/board");
  }
}
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
