<template>
  <div class="board-container">
    <h1 class="board-title">결재서 상세</h1>
    <form class="board-form" @submit.prevent>
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 선택</label>
        <select id="team" v-model="selectedTeamId" class="form-input" disabled>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
      <!-- 결재선 템플릿 목록-->
      <div class="form-row">
        <label class="form-label" for="template">결재선 템플릿</label>
        <select v-model="document.templateId" class="form-input" disabled>
          <option v-if="document.template" :value="document.template.id">
            {{ document.template.name }}
          </option>
        </select>
      </div>
      <!-- 결재자 목록-->
      <div class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul v-if="approvers.length" class="approvers-preview">
          <li v-for="(approver, index) in approvers" :key="approver.id">
            {{ index + 1 }}차 결재자: {{ approver.name }}
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
          placeholder="제목을 입력하세요"
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
          placeholder="내용을 입력하세요"
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
import { useAuthApi } from "~/composable/auth";
import type { User } from "~/modules/user/types";
import type { CommonCode } from "~/modules/common-code/types";
import type { ApprovalDocument } from "~/modules/approval/types";
import { fetchCommonCodeList } from "~/modules/common-code/api";

const route = useRoute();
const router = useRouter();
const documentId = Number(route.params.id);

const document = ref<Partial<ApprovalDocument>>({});
const teams = ref<CommonCode[]>([]);
const selectedTeamId = ref<number | null>(null);
const approvers = ref<User[]>([]);

async function fetchDocument() {
  try {
    const result = await useAuthApi<ApprovalDocument>(
      `http://localhost:8000/approval/${documentId}`,
    );
    if (result) {
      document.value = result;
      selectedTeamId.value = result.teamId;
      if (result.templateId) {
        await fetchApprovers(result.templateId);
      }
    }
  } catch (error) {
    console.error("Failed to fetch approval document:", error);
    alert("결재 문서를 불러오는데 실패했습니다.");
  }
}

async function fetchApprovers(templateId: number) {
  try {
    approvers.value = await $fetch<User[]>(
      `http://localhost:8000/approval/all/step-users/${templateId}`,
    );
  } catch (error) {
    console.error("Failed to fetch approvers:", error);
    approvers.value = [];
  }
}

async function deleteDocument() {
  if (!confirm("정말로 이 결재 문서를 삭제하시겠습니까?")) {
    return;
  }
  try {
    await useAuthApi(`http://localhost:8000/approval/${documentId}`, {
      method: "DELETE",
    });
    alert("결재 문서가 삭제되었습니다.");
    await router.push("/approval");
  } catch (error) {
    console.error("Failed to delete approval document:", error);
    alert("결재 문서 삭제에 실패했습니다.");
  }
}

onMounted(async () => {
  const teamResult = await fetchCommonCodeList("TEAM");
  if (teamResult) {
    teams.value = teamResult;
  }
  await fetchDocument();
});
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
