<template>
  <div class="board-container">
    <h1 class="board-title">결재서 작성</h1>
    <form class="board-form" @submit.prevent="submit">
      <div class="form-row">
        <label class="form-label" for="template">결재선 템플릿</label>
        <select v-model="selectedTemplateId" class="form-input">
          <option v-for="tpl in templates" :value="tpl.id" :key="tpl.id">
            {{ tpl.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedTemplateApprovers.length" class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul class="approvers-preview">
          <li
            v-for="(approver, index) in selectedTemplateApprovers"
            :key="approver.id"
          >
            {{ index + 1 }}차 결재자: {{ approver.name }}
          </li>
        </ul>
      </div>
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
import { useAuthApi } from "~/composable/auth";
import type { approvalStepTemplate } from "~/modules/approval/step-template/types";
import type { User } from "~/modules/user/types";

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

// 결재선 로직들
const selectedTemplateId = ref<number | null>(null);
const templates = ref<approvalStepTemplate[]>([]);
const selectedTemplateApprovers = ref<User[]>([]);

watch(selectedTemplateId, async (id) => {
  if (id) {
    const res = await $fetch(
      `http://localhost:8000/approval/approval-template/${id}`,
    );
    selectedTemplateApprovers.value = res.approvers;
  }
});

onMounted(async () => {
  const res = await $fetch<approvalStepTemplate[]>(
    `http://localhost:8000/approval/all/step-template`,
  );
  templates.value = res;
  selectedTemplateId.value = res[0].id;
});
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
