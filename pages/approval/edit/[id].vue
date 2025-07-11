<template>
  <div class="board-container">
    <h1 class="board-title">결재서 수정</h1>
    <form class="board-form" @submit.prevent="submit">
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 선택</label>
        <select id="team" v-model="selectedTeamId" class="form-input">
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
      <!-- 결재선 템플릿 목록-->
      <div class="form-row">
        <label class="form-label" for="template">결재선 템플릿</label>
        <select
          v-model="payload.templateId"
          :disabled="!payload.templateId"
          class="form-input"
        >
          <option v-for="tpl in templates" :value="tpl.id" :key="tpl.id">
            {{ tpl.name }}
          </option>
        </select>
      </div>
      <!-- 결재자 목록-->
      <div class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul v-if="selectedTemplateApprovers.length" class="approvers-preview">
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
          v-model="payload.title"
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
          v-model="payload.content"
          class="form-input"
          rows="8"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>
      <div class="board-toolbar">
        <button type="submit" class="btn-submit">수정</button>
        <NuxtLink :to="`/approval/${documentId}`">
          <button class="btn-submit">취소</button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composable/auth";
import type { ApprovalStepTemplate } from "~/modules/approval/step-template/types";
import type { User } from "~/modules/user/types";
import type { CommonCode } from "~/modules/common-code/types";
import type {
  ApprovalDocument,
  ApprovalDocumentPayload,
} from "~/modules/approval/types";
import { fetchCommonCodeList } from "~/modules/common-code/api";

const route = useRoute();
const router = useRouter();
const documentId = Number(route.params.id);

const payload = reactive<ApprovalDocumentPayload>({
  templateId: null,
  title: "",
  content: "",
  status: "draft",
});

const teams = ref<CommonCode[]>([]);
const selectedTeamId = ref<number | null>(null);
const templates = ref<ApprovalStepTemplate[]>([]);
const selectedTemplateApprovers = ref<User[]>([]);

async function fetchDocument() {
  try {
    const result = await useAuthApi<ApprovalDocument>(
      `http://localhost:8000/approval/${documentId}`,
    );
    if (result) {
      payload.title = result.title;
      payload.content = result.content;
      payload.templateId = result.templateId;
      selectedTeamId.value = result.teamId;
    }
  } catch (error) {
    console.error("Failed to fetch approval document:", error);
    alert("결재 문서를 불러오는데 실패했습니다.");
  }
}

async function submit() {
  try {
    const result = await useAuthApi<ApprovalDocument>(
      `http://localhost:8000/approval/${documentId}`,
      {
        method: "PUT",
        body: payload,
      },
    );
    if (result) {
      alert("결재 문서가 수정되었습니다.");
      await router.push(`/approval/${documentId}`);
    }
  } catch (error) {
    console.error("Failed to update approval document:", error);
    alert("결재 문서 수정에 실패했습니다.");
  }
}

onMounted(async () => {
  const teamResult = await fetchCommonCodeList("TEAM");
  if (teamResult) {
    teams.value = teamResult;
  }
  await fetchDocument();
});

watch(selectedTeamId, async (teamId) => {
  if (!teamId) return;
  try {
    const res = await $fetch<ApprovalStepTemplate[]>(
      `http://localhost:8000/approval-templates/team/${teamId}`,
    );
    if (res && res.length) {
      templates.value = res;
      if (!payload.templateId) {
        payload.templateId = res[0].id;
      }
    } else {
      templates.value = [];
      payload.templateId = null;
    }
  } catch (error) {
    templates.value = [];
    payload.templateId = null;
  }
});

watch(
  () => payload.templateId,
  async (templateId) => {
    if (templateId) {
      selectedTemplateApprovers.value = await $fetch<User[]>(
        `http://localhost:8000/approval-templates/${templateId}/users`,
      );
    } else {
      selectedTemplateApprovers.value = [];
    }
  },
);
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>