<template>
  <nav class="sidebar">
    <div class="logo">그룹웨어</div>
    <ul class="menu">
      <li
          v-for="item in menuItems"
          :key="item.key"
          :class="{ active: activeMenu === item.key }"
          @click="selectMenu(item.key)"
      >
        <span class="icon">{{ item.icon }}</span>{{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter()

const menuItems = [
  { key: 'mail', name: '메일', icon: '📧' },
  { key: 'msg', name: '쪽지', icon: '💬' },
  { key: 'approval', name: '전자결재', icon: '📝' },
  { key: 'manage', name: '결재 관리', icon: '📋' },
  { key: 'report', name: '보고', icon: '📊' },
  { key: 'settings', name: '설정', icon: '⚙️' },
]

const activeMenu = ref('')

function selectMenu(key: string) {
  activeMenu.value = key
  if (key === 'approval') router.push('/approval')
}
</script>

<style scoped src="./Sidebar.css" />
