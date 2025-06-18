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
        <NuxtLink
          :to="
            item.link === '/board'
              ? { path: item.link, query: { page: 1 } }
              : item.link
          "
          class="menu-link"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();

const menuItems = [
  { key: "board", name: "게시판", link: "/board" },
  { key: "approval", name: "전자결재", link: "/approval" },
  { key: "mail", name: "메일", link: "/mail" },
  { key: "msg", name: "쪽지", link: "/msg" },
  { key: "manage", name: "결재 관리", link: "/manage" },
  { key: "report", name: "보고", link: "/report" },
  { key: "settings", name: "설정", link: "/settings" },
];

function isActive(item: (typeof menuItems)[0]) {
  // 현재 경로가 item.link 로 시작하면 active
  return route.path.startsWith(item.link);
}
</script>

<style scoped src="./Sidebar.css" />
,
