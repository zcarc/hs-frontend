<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 상세</h1>
    <div v-if="!isLoading" class="board-form">
      <!-- 팀 이름 선택-->
      <div class="form-row">
        <label class="form-label" for="approver">팀 이름</label>
        <p id="team">{{ team?.commonCode.name }}</p>
      </div>
      <!-- 템플릿 이름 입력 -->
      <div class="form-row">
        <label class="form-label" for="templateName">템플릿 이름</label>
        <p id="templateName">{{ templateName }}</p>
      </div>
      <!-- 현재까지 추가된 결재선 목록 -->
      <div v-if="steps.length > 0" class="form-row">
        <label class="form-label">결재자 목록</label>
        <ul class="space-y-[12px]">
          <li v-for="(step, index) in steps" :key="step.id">
            {{ index + 1 }}차 결재자: – {{ step.approver.name }}
          </li>
        </ul>
      </div>
      <!--      수정 / 삭제 / 목록-->
      <div class="board-toolbar">
        <NuxtLink :to="`edit/${id}`">
          <button type="button" class="btn-submit">수정</button>
        </NuxtLink>
        <button type="button" class="btn-submit" @click="deleteTemplate">
          삭제
        </button>
        <NuxtLink to="/approval/step-template">
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
import { useAuthApi } from "~/composable/auth";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const team = ref<Team | null>(null);
const templateName = ref<string>("");
const steps = ref<ApprovalStep[]>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await $fetch<ApprovalStepTemplate>(
      `http://localhost:8000/approval-templates/${id}`,
      {
        method: "GET",
      },
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

const deleteTemplate = async () => {
  if (confirm("템플릿을 삭제하시겠습니까?")) {
    try {
      const res = await useAuthApi(
        `http://localhost:8000/approval-templates/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res) {
        alert("템플릿이 삭제되었습니다.");
        await router.push("/approval/step-template");
      }
    } catch (e) {
      alert("템플릿 삭제에 실패했습니다.");
    }
  }
};
</script>

<style scoped src="~/modules/approval/step-template/css/nonlist-layout.css" />
<style scoped src="./[id].css" />
