<template>
  <div class="board-container">
    <h1 class="board-title">결재선 템플릿 생성 (관리자)</h1>
    <StepTemplateInputForm :submitCb="submitCb" />
  </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composable/auth";
import type { SaveApprovalTemplatePayload } from "~/modules/approval/step-template/types";

// 템플릿 저장
async function submitCb(payload: SaveApprovalTemplatePayload) {
  try {
    const result = await useAuthApi(
      "http://localhost:8000/approval/create/step-template",
      {
        method: "POST",
        body: payload,
      },
    );

    if (result) {
      alert("템플릿이 성공적으로 저장되었습니다.");
    }
  } catch (error) {
    alert("템플릿 저장 중 오류가 발생했습니다.");
  }
}
</script>

<style scoped src="~/modules/approval/step-template/css/nonlist-layout.css" />
