<template>
  <header class="header">
    <div class="breadcrumb">Home &gt; 대시보드</div>
    <div class="user-info">
      <template v-if="auth.isLoggedIn">
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
import { useAuthStore } from "~/stores/auth.js";

const auth = useAuthStore();
</script>

<style scoped src="./Header.css" />
