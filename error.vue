<template>
  <div class="error-container">
    <div class="error-card">
      <div class="error-header">
        <h1>{{ error.statusCode }}</h1>
        <!--        <div class="error-title">-->
        <!--          {{ error.statusMessage || "페이지를 찾을 수 없습니다." }}-->
        <!--        </div>-->
        <div class="error-title">페이지를 찾을 수 없습니다.</div>
      </div>
      <!--      <div class="error-message" v-if="error.message">-->
      <!--        {{ error.message }}-->
      <!--      </div>-->
      <!--      <div class="error-detail" v-if="error.data?.message">-->
      <!--        {{ error.data.message }}-->
      <!--      </div>-->
      <button class="error-btn" @click="handleError">홈으로 돌아가기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError();

const handleError = async () => {
  await clearError({ redirect: "/" });
};
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f6f7fb;
}

.error-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 40px 32px;
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.error-header {
  margin-bottom: 20px;
}

.error-header h1 {
  font-size: 3rem;
  color: #e74c3c;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.error-title {
  font-size: 1.25rem;
  color: #444;
  margin-bottom: 4px;
}

.error-message,
.error-detail {
  margin: 10px 0;
  color: #777;
  font-size: 1rem;
  word-break: keep-all;
}

.error-btn {
  margin-top: 24px;
  padding: 12px 32px;
  background: #007acc;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.error-btn:hover {
  background: #005fa3;
}
</style>
