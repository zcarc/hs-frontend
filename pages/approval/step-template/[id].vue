<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 상세</h1>
    <div v-if="!isLoading" class="board-form">
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 이름</label>
        <p id="team">{{ team?.commonCode.name }}</p>
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
      <!-- <div class="form-row">
        <label class="form-label" for="approver">결재자 선택</label>
        <select id="approver" v-model="approverId" class="form-input">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <button type="button" class="btn-submit" @click="addStep">추가</button>
      </div> -->

      <!-- 현재까지 추가된 결재선 목록 -->
      <div v-if="steps.length > 0" class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul class="space-y-[12px]">
          <li v-for="(step, index) in steps" :key="step.id">
            {{ index + 1 }}차 결재자: – {{ step.approver.name }}
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
  </div>
</template>

<script setup lang="ts">
import type { ApprovalStepTemplate } from "~/modules/approval/step-template/types";
import type { ApprovalStep } from "~/modules/approval/step/types";
import type { Team } from "~/modules/team/types";

const route = useRoute();
const id = route.params.id;

const team = ref<Team | null>(null);
const templateName = ref<string>("");
const steps = ref<ApprovalStep[]>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await $fetch<ApprovalStepTemplate>(
      `http://localhost:8000/approval/step-template/${id}`
    );
    console.log("res: ", res);
    if (res?.team) {
      team.value = res.team;
    }
    if (res?.name) {
      templateName.value = res.name;
    }
    if (res?.approvalSteps) {
      steps.value = res.approvalSteps;
    }
  } catch (e) {
    steps.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped src="~/modules/approval/step-template/css/nonlist-layout.css" />
<style scoped src="./[id].css" />
