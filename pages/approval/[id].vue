<template>
  <div class="board-container">
    <h1 class="board-title">결재서 상세</h1>
    <form v-if="document" class="board-form" @submit.prevent>
      <!-- 팀 이름 표시 -->
      <div class="form-row">
        <label class="form-label">팀</label>
        <input :value="teamName" type="text" class="form-input" readonly />
      </div>
      <!-- 결재선 템플릿 이름 표시 -->
      <div class="form-row">
        <label class="form-label">결재선 템플릿</label>
        <input :value="templateName" type="text" class="form-input" readonly />
      </div>
      <!-- 결재자 목록 표시 -->
      <div class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul v-if="document.approvalDocumentSteps" class="approvers-preview">
          <li
            v-for="step in document.approvalDocumentSteps"
            :key="step.stepOrder"
          >
            {{ step.stepOrder }}차 결재자: {{ step.approver.name }}
          </li>
        </ul>
      </div>
      <div class="form-row">
        <label class="form-label" for="title">제목</label>
        <input
          id="title"
          v-model="document.title"
          type="text"
          class="form-input"
          readonly
        />
      </div>
      <div class="form-row">
        <label class="form-label" for="content">내용</label>
        <textarea
          id="content"
          v-model="document.content"
          class="form-input"
          rows="8"
          readonly
        ></textarea>
      </div>
      <div class="board-toolbar">
        <NuxtLink :to="`/approval/edit/${documentId}`">
          <button class="btn-submit">수정</button>
        </NuxtLink>
        <button class="btn-submit" @click="deleteDocument">삭제</button>
        <NuxtLink to="/approval">
          <button class="btn-submit">목록으로</button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ResponseApprovalDocument } from "~/modules/approval/types";

const route = useRoute();
const router = useRouter();
const documentId = Number(route.params.id);

const document = ref<ResponseApprovalDocument | null>(null);

const teamName = computed(() => {
  // if (document.value?.approvalSteps[0]?.template.team.commonCode.name) {
  //   return document.value.approvalSteps[0].template.team.commonCode.name;
  // }
  return "팀 정보 없음";
});

const templateName = computed(() => {
  // if (document.value?.approvalSteps[0]?.template.name) {
  //   return document.value.approvalSteps[0].template.name;
  // }
  return "템플릿 정보 없음";
});

async function fetchDocument() {
  try {
    const result = await $fetch<ResponseApprovalDocument>(
      `http://localhost:8000/approval/${documentId}`
    );
    console.log("result ", result);
    if (result) {
      document.value = result;
    } else {
      throw new Error("결재문서 에러");
    }
  } catch (error) {
    console.error("Failed to fetch approval document:", error);
    alert("결재 문서를 불러오는데 실패했습니다.");
  }
}

async function deleteDocument() {
  if (!confirm("정말로 이 결재 문서를 삭제하시겠습니까?")) {
    return;
  }
  try {
    await $fetch(`http://localhost:8000/approval/${documentId}`, {
      method: "DELETE",
    });
    alert("결재 문서가 삭제되었습니다.");
    await router.push("/approval");
  } catch (error) {
    console.error("Failed to delete approval document:", error);
    alert("결재 문서 삭제에 실패했습니다.");
  }
}

onMounted(() => {
  fetchDocument();
});
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>