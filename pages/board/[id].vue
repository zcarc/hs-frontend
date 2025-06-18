<template>
  <div class="board-container">
    <h1 class="board-title">게시글 상세</h1>
    <template v-if="post">
      <form class="board-form" @submit.prevent>
        <div class="form-row">
          <label class="form-label">제목</label>
          <input class="form-input" :value="post?.title" readonly />
        </div>
        <div class="form-row">
          <label class="form-label">내용</label>
          <textarea
            class="form-input"
            rows="8"
            :value="post?.content"
            readonly
          ></textarea>
        </div>
        <div class="board-toolbar">
          <NuxtLink :to="`/board/edit/${post.id}`">
            <button class="btn-submit">수정하기</button>
          </NuxtLink>
          <button class="btn-submit" @click="remove">삭제하기</button>
          <NuxtLink to="/board">
            <button class="btn-submit">목록으로</button>
          </NuxtLink>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import type { Post } from "~/types/post";
import { useAuthApi } from "~/composable/useAuthApi";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const post = ref<Post | null>(null);

async function remove() {
  const result = await useAuthApi(`http://localhost:8000/post/${id}`, {
    method: "DELETE",
  });
  if (result) {
    await router.push("/board");
  }
}

onMounted(async () => {
  try {
    post.value = await $fetch(`http://localhost:8000/post/${id}`);
  } catch (e) {
    post.value = null;
  }
});
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
