<template>
  <header class="header">
    <div class="breadcrumb">Home &gt; 대시보드</div>
    <div class="user-info">
      <!-- 로딩 중일 때는 빈 공간 -->
      <!--      <template v-if="auth.isLoading">-->
      <!--        <div class="loading-placeholder">-->
      <!--          &lt;!&ndash; 로딩 중 표시할 내용 &ndash;&gt;-->
      <!--        </div>-->
      <!--      </template>-->
      <!-- 로딩 완료 후 실제 UI -->
      <template v-if="auth.user">
        <div class="auth-login-text">
          <span>{{ auth.user.name }}님</span>
          <button @click="auth.logout">로그아웃</button>
        </div>
      </template>
      <template v-else>
        <div class="auth-links">
          <NuxtLink to="/login">로그인</NuxtLink>
          <NuxtLink to="/signup">회원가입</NuxtLink>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

// await auth.me();
</script>

<style scoped src="./Header.css" />
