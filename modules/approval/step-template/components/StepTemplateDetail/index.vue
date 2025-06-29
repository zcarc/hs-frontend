<template>
  <div class="board-form">
    <!-- 팀 이름 선택-->
    <div class="form-row">
      <label class="form-label" for="approver">팀 이름</label>
      <p id="team">{{ teamName }}</p>
      <!-- <select id="team" v-model="teamId" class="form-input">
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select> -->
    </div>
    <!-- 템플릿 이름 입력 -->
    <div class="form-row">
      <label class="form-label" for="templateName">템플릿 이름</label>
      <p id="templateName">{{ templateName }}</p>
      <!-- <input
        id="templateName"
        type="text"
        v-model="templateName"
        placeholder="템플릿 이름을 입력하세요"
        class="form-input"
        required
      /> -->
    </div>
    <!-- 결재자 선택 및 추가 -->
    <div class="form-row">
      <label class="form-label" for="approver">결재자 선택</label>
      <!-- <select id="approver" v-model="approverId" class="form-input">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <button type="button" class="btn-submit" @click="addStep">추가</button> -->
    </div>

    <!-- 현재까지 추가된 결재선 목록 -->
    <div v-if="users.length > 0" class="form-row">
      <label class="form-label">결재자 목록</label>
      <ul class="space-y-[12px]">
        <li v-for="(user, index) in users" :key="user.id">
          {{ index + 1 }}차 결재자: – {{ user.name }}
        </li>
      </ul>
    </div>

    <!-- 수정 / 취소 버튼 -->
    <div class="board-toolbar">
      <button type="button" class="btn-submit">수정</button>
      <NuxtLink to="/approval">
        <button type="button" class="btn-submit">목록으로</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  DetailApprovalTemplateInitialData,
  SaveApprovalTemplatePayload,
} from "~/modules/approval/step-template/types";
import type { CommonCode } from "~/modules/common-code/types";
import { fetchAllUsersByTeamId } from "~/modules/user/api";

const { initialData, submitCb } = defineProps<{
  initialData: DetailApprovalTemplateInitialData;
  submitCb: (payload: SaveApprovalTemplatePayload) => void;
}>();

const { templateName, teamId, teamName, users } = initialData;

// const approverId = ref<number | null>(null);
// const users = ref<{ id: number; name: string }[]>([]);
// const teams = ref<CommonCode[]>([]);

// async function initUsers() {
//   if (teamId) {
//     try {
//       const res = await fetchAllUsersByTeamId(teamId);
//       if (res) {
//         users.value = res;
//         approverId.value = res[0].id;
//       }
//     } catch (e) {
//       users.value = [];
//       approverId.value = null;
//     }
//   }
// }

// function addStep() {
//   if (!approverId.value) {
//     return;
//   }
//   if (steps.some((step) => step.approverId === approverId.value)) {
//     alert("이미 추가된 사용자입니다.");
//     return;
//   }
//   steps.push({
//     approverId: approverId.value,
//   });
// }

// function getUserName(id: number) {
//   return users.value.find((u) => u.id === id)?.name;
// }

// function removeStep(index: number) {
//   steps.splice(index, 1);
// }

// function onSubmit() {
//   const { templateName, teamId, steps } = value;
//   const templateNameTrim = templateName.trim();
//   if (!templateNameTrim) {
//     return alert("템플릿 이름을 입력해주세요.");
//   }
//   if (!steps.length) {
//     return alert("결재선을 한 명 이상 추가해주세요.");
//   }
//   if (!teamId) {
//     return alert("팀을 선택해주세요.");
//   }

//   const payload: SaveApprovalTemplatePayload = {
//     templateData: {
//       name: templateNameTrim,
//     },
//     stepData: steps,
//     teamId: teamId,
//   };

//   submitCb(payload);
// }

// onMounted(async () => {
//   const teamResult = await fetchCommonCodeList("TEAM");
//   if (teamResult?.length) {
//     teams.value = teamResult;
//     teamId = teamResult[0].id;
//   }

//   await initUsers();
// });

// watch(() => teamId, initUsers);
</script>

<style scoped src="./index.css" />
