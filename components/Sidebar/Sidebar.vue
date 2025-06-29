<template>
  <nav class="sidebar">
    <NuxtLink to="/">
      <div class="logo">그룹웨어</div>
    </NuxtLink>
    <ul class="menu">
      <li
        v-for="item in menuItems"
        :key="item.key"
        :class="{ active: isActive(item) }"
      >
        <NuxtLink :to="item.route" class="menu-link">
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();

const menuItems = [
  {
    key: "board",
    name: "게시판",
    route: { path: "/board", query: { page: 1 } },
  },
  {
    key: "approval",
    name: "결재 목록",
    route: { path: "/approval", query: { page: 1 } },
  },
  {
    key: "approval-step",
    name: "결재선 템플릿 목록",
    route: { path: "/approval/step-template" },
  },
  {
    key: "approval-step-edit",
    name: "결재선 템플릿 수정 (관리자)",
    route: { path: "/approval/step-template/edit" },
  },
  { key: "mail", name: "메일", route: { path: "/mail" } },
  { key: "msg", name: "쪽지", route: { path: "/msg" } },
  { key: "manage", name: "결재 관리", route: { path: "/manage" } },
  { key: "report", name: "보고", route: { path: "/report" } },
  { key: "settings", name: "설정", route: { path: "/settings" } },
];

function isActive(item: (typeof menuItems)[0]) {
  const current = route.path;
  const target = item.route.path;
  return current === target;
}
</script>

<style scoped src="./Sidebar.css" />
,
