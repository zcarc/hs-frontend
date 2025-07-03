<template>
  <div class="board-container">
    <h1 class="board-title">결재서 작성</h1>
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
          v-model="selectedTemplateId"
          :disabled="!selectedTemplateId"
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
import type { ApprovalStepTemplate } from "~/modules/approval/step-template/types";
import type { User } from "~/modules/user/types";
import type { CommonCode } from "~/modules/common-code/types";
import type { ApprovalDocumentPayload } from "~/modules/approval/types";
import { fetchCommonCodeList } from "~/modules/common-code/api";

const payload: ApprovalDocumentPayload = reactive({
  templateId: "",
  title: "",
  content: "",
  status: "",
});

// 결재선 로직들
const teams = ref<CommonCode[]>([]);
const selectedTeamId = ref<number | null>(null);

const templates = ref<ApprovalStepTemplate[]>([]);
const selectedTemplateId = ref<number | null>(null);

const selectedTemplateApprovers = ref<User[]>([]);

const router = useRouter();

const auth = useAuthStore();

async function submit() {
  if (!auth.user?.userId) {
    alert("로그인이 필요합니다.");
    return;
  }

  payload.status = "submitted";
  const result = await useAuthApi<ApprovalDocumentPayload>(
    "http://localhost:8000/approval",
    {
      method: "POST",
      body: payload,
    },
  );
  if (result) {
    await router.push("/approval");
  }
}

async function loadTemplatesByTeamId() {}

onMounted(async () => {
  // 팀 이름 초기화
  const teamResult = await fetchCommonCodeList("TEAM");
  if (teamResult && teamResult.length) {
    teams.value = teamResult;
    selectedTeamId.value = teamResult[0].id;
  }
});

// 템플릿 목록 가져오기
watch(selectedTeamId, async (teamId) => {
  try {
    const res = await $fetch<ApprovalStepTemplate[]>(
      "http://localhost:8000/approval/team/step-templates",
      {
        params: { teamId },
      },
    );
    if (res && res.length) {
      console.log("res: ", res);
      templates.value = res;
      selectedTemplateId.value = res[0].id;
    } else {
      throw new Error("템플릿이 존재하지 않습니다.");
    }
  } catch (error) {
    templates.value = [];
    selectedTemplateId.value = null;
  }
});

// 결재자 목록 가져오기
watch(selectedTemplateId, async (templateId) => {
  if (templateId) {
    selectedTemplateApprovers.value = await $fetch<User[]>(
      `http://localhost:8000/approval/all/step-users/${templateId}`,
    );
  }
});
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
