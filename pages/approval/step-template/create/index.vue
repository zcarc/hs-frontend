<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 생성 (관리자)</h1>
    <!--    <StepTemplateInputForm :submitCb="submitCb" />-->
    <form v-if="!isLoading" class="board-form" @submit.prevent="onSubmit">
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 선택</label>
        <select id="team" v-model="form.teamId" class="form-input">
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
      <!-- 템플릿 이름 입력 -->
      <div class="form-row">
        <label class="form-label" for="templateName">템플릿 이름</label>
        <input
          id="templateName"
          type="text"
          v-model="form.templateName"
          placeholder="템플릿 이름을 입력하세요"
          class="form-input"
          required
        />
      </div>
      <!-- 결재자 선택 및 추가 -->
      <div class="form-row">
        <label class="form-label" for="approver">결재자 선택</label>
        <select id="approver" v-model="approverId" class="form-input">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <button type="button" class="btn-submit" @click="addStep">추가</button>
      </div>

      <!-- 현재까지 추가된 결재선 목록 -->
      <div v-if="form.steps.length > 0" class="form-row">
        <label class="form-label">결재선</label>
        <ul class="space-y-[12px]">
          <li v-for="(step, index) in form.steps" :key="index">
            {{ index + 1 }}단계 – {{ getUserName(step.approverId) }}
            <button
              class="btn-submit fix-p"
              type="button"
              @click="removeStep(index)"
            >
              삭제
            </button>
          </li>
        </ul>
      </div>

      <!-- 저장 / 취소 버튼 -->
      <div class="board-toolbar">
        <button type="submit" class="btn-submit">저장</button>
        <NuxtLink to="/approval/step-template">
          <button type="button" class="btn-submit">목록으로</button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composable/auth";
import type {
  SaveApprovalTemplateInitialData,
  SaveApprovalTemplatePayload,
} from "~/modules/approval/step-template/types";
import { fetchAllUsersByTeamId } from "~/modules/user/api";
import type { CommonCode } from "~/modules/common-code/types";
import { fetchCommonCodeList } from "~/modules/common-code/api";

const router = useRouter();

const form: SaveApprovalTemplateInitialData = reactive({
  teamId: null,
  templateName: "",
  steps: [],
});

const approverId = ref<number | null>(null);
const users = ref<{ id: number; name: string }[]>([]);
const teams = ref<CommonCode[]>([]);

const isLoading = ref<boolean>(false);

async function initUsers() {
  const teamId = form.teamId;
  if (teamId) {
    try {
      const res = await fetchAllUsersByTeamId(teamId);
      if (res) {
        users.value = res;
        approverId.value = res[0].id;
      }
    } catch (e) {
      users.value = [];
      approverId.value = null;
    }
  }
}

function addStep() {
  if (!approverId.value) {
    return;
  }
  if (form.steps.some((step) => step.approverId === approverId.value)) {
    alert("이미 추가된 사용자입니다.");
    return;
  }
  form.steps.push({
    approverId: approverId.value,
  });
}

function getUserName(id: number) {
  return users.value.find((u) => u.id === id)?.name;
}

function removeStep(index: number) {
  form.steps.splice(index, 1);
}

async function onSubmit() {
  const { templateName, teamId, steps } = form;
  const templateNameTrim = templateName.trim();
  if (!templateNameTrim) {
    return alert("템플릿 이름을 입력해주세요.");
  }
  if (!steps.length) {
    return alert("결재선을 한 명 이상 추가해주세요.");
  }
  if (!teamId) {
    return alert("팀을 선택해주세요.");
  }

  const payload: SaveApprovalTemplatePayload = {
    templateData: {
      name: templateNameTrim,
    },
    stepData: steps,
    teamId: teamId,
  };

  try {
    const result = await useAuthApi(
      "http://localhost:8000/approval-templates",
      {
        method: "POST",
        body: payload,
      }
    );

    if (result) {
      alert("템플릿이 성공적으로 저장되었습니다.");
      router.push("/approval/step-template");
    }
  } catch (error) {
    alert("템플릿 저장 중 오류가 발생했습니다.");
  }
}

onMounted(async () => {
  try {
    isLoading.value = true;

    // 팀 목록
    const teamResult = await fetchCommonCodeList("TEAM");
    if (teamResult?.length) {
      teams.value = teamResult;
      form.teamId = teamResult[0].id;
    }

    // 결재자 목록
    await initUsers();
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
});

watch(() => form.teamId, initUsers);
</script>

<style scoped src="~/modules/approval/step-template/css/nonlist-layout.css" />
<style scoped src="./index.css" />
<style scoped>
.fix-p {
  padding: 2px 10px;
}
</style>