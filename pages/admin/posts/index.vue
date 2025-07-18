<template>
  <div>
    <h2>게시글 관리</h2>
    <table class="post-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.authorName }}</td>
          <td>
            <button @click="deletePost(post.id)" class="delete-button">
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 페이지네이션 컴포넌트는 추후 추가 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PagedResponse, PostListResponse } from "~/modules/post/types";

// 로그인, 회원가입 기능이 구현되면 그때 활성화
// definePageMeta({
//   layout: 'admin',
//   middleware: 'admin-auth',
// });

const posts = ref<PostListResponse[]>([]);

async function fetchPosts() {
  try {
    const response = await $fetch<PagedResponse<PostListResponse>>(
      "/api/admin/posts",
      {
        params: {
          page: 1, // 우선 첫 페이지만 불러옵니다.
          size: 20, // 최대 20개
        },
      },
    );
    posts.value = response.content;
  } catch (error) {
    console.error("게시글을 불러오는 데 실패했습니다:", error);
    alert("게시글을 불러올 수 없습니다. 관리자 권한이 있는지 확인하세요.");
  }
}

async function deletePost(postId: number) {
  if (!confirm(`정말로 ${postId}번 게시글을 삭제하시겠습니까?`)) {
    return;
  }

  try {
    await $fetch(`/api/admin/posts/${postId}`, {
      method: "DELETE",
    });
    alert("게시글이 삭제되었습니다.");
    // 삭제 후 목록을 새로고침합니다.
    await fetchPosts();
  } catch (error) {
    console.error(`${postId}번 게시글 삭제에 실패했습니다:`, error);
    alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
  }
}

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.post-table th,
.post-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.post-table th {
  background-color: #f2f2f2;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
