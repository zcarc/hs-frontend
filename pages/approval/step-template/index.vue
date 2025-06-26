<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 생성</h1>

    <form class="board-form" @submit.prevent="submit">
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 선택</label>
        <select id="team" v-model="teamId" class="form-input">
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
          v-model="templateName"
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
      <!--      <div class="form-row">-->
      <!--        <label class="form-label" for="approver">결재자 선택</label>-->
      <!--        <select id="approver" v-model="approverId" class="form-input">-->
      <!--          <option disabled value="">&#45;&#45; 결재자를 선택하세요 &#45;&#45;</option>-->
      <!--          <option v-for="user in users" :key="user.id" :value="user.id">-->
      <!--            {{ user.name }}-->
      <!--          </option>-->
      <!--        </select>-->
      <!--      </div>-->

      <!--      <div class="board-toolbar">-->
      <!--        <button type="button" class="btn-submit" @click="addStep">추가</button>-->
      <!--      </div>-->

      <!-- 현재까지 추가된 결재선 목록 -->
      <div v-if="steps.length > 0" class="form-row">
        <label class="form-label">결재선</label>
        <ul class="space-y-[12px]">
          <li v-for="(step, index) in steps" :key="index">
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
      <!--      <div v-if="steps.length > 0" class="form-row">-->
      <!--        <label class="form-label">결재선 목록</label>-->
      <!--        <ul>-->
      <!--          <li v-for="(step, index) in steps" :key="index">-->
      <!--            {{ index + 1 }}단계 - {{ getUserName(step.approverId) }}-->
      <!--            <button type="button" @click="removeStep(index)">삭제</button>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->

      <!-- 저장 / 취소 버튼 -->
      <div class="board-toolbar">
        <button type="submit" class="btn-submit">저장</button>
        <NuxtLink to="/approval">
          <button type="button" class="btn-submit">목록으로</button>
        </NuxtLink>
      </div>

      <!--      <div class="board-toolbar">-->
      <!--        <button type="submit" class="btn-submit">저장</button>-->
      <!--        <NuxtLink to="/approval">-->
      <!--          <button class="btn-submit">목록으로</button>-->
      <!--        </NuxtLink>-->
      <!--      </div>-->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { CreateApprovalSteps } from "~/modules/approval/types";
import { useAuthApi } from "~/composable/auth";
import { fetchAllUsersByTeamId } from "~/modules/user/api";
import { fetchCommonCodeList } from "~/modules/common-code/api";
import type { CommonCode } from "~/modules/common-code/types";

const teamId = ref<number>();
const templateName = ref<string>("");
const approverId = ref<number | null>();

const teams = ref<CommonCode[]>([]);
const steps = ref<CreateApprovalSteps[]>([]);
const users = ref<{ id: number; name: string }[]>([]);

async function initUsers() {
  // 사용자 목록 불러오기
  if (teamId.value) {
    try {
      const res = await fetchAllUsersByTeamId(teamId.value);
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

onMounted(async () => {
  // 팀 목록 불러오기
  const teamResult = await fetchCommonCodeList("TEAM");
  if (teamResult?.length) {
    teams.value = teamResult;
    teamId.value = teamResult[0].id;
  }

  await initUsers();
});

watch(teamId, async () => {
  await initUsers();
});

// 결재자 추가
function addStep() {
  if (!approverId.value) {
    return;
  }
  if (steps.value.some((step) => step.approverId === approverId.value)) {
    alert("이미 추가된 사용자입니다.");
    return;
  }
  steps.value.push({
    approverId: approverId.value,
  });
}

// 결재자 삭제
function removeStep(index: number) {
  steps.value.splice(index, 1);
}

// ID -> 이름 반환 헬퍼
function getUserName(id: number) {
  return users.value.find((u) => u.id === id)?.name;
}

// 템플릿 저장
async function submit() {
  if (!templateName.value.trim()) {
    return alert("템플릿 이름을 입력해주세요.");
  }
  if (steps.value.length === 0) {
    return alert("결재선을 한 명 이상 추가해주세요.");
  }

  // payload 형태 맞춤
  const payload = {
    templateData: {
      name: templateName.value.trim(),
    },
    stepData: steps.value,
    teamId: teamId.value,
  };

  try {
    const result = await useAuthApi(
      "http://localhost:8000/approval/create/step-template",
      {
        method: "POST",
        body: payload,
      },
    );

    console.log("result: ", result);

    if (result) {
      alert("템플릿이 성공적으로 저장되었습니다.");
    }
  } catch (error) {
    alert("템플릿 저장 중 오류가 발생했습니다.");
  }
}
</script>

<style scoped src="/assets/css/shared/pages/board/create.css"></style>
<style scoped>
.fix-p {
  padding: 2px 10px;
}
</style>
