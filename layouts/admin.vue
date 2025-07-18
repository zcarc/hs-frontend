<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>관리자 페이지</h1>
      <!-- 나중에 여기에 관리자용 네비게이션 메뉴를 추가할 수 있습니다. -->
    </header>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.admin-main {
  flex-grow: 1;
  padding: 2rem;
}
</style>
