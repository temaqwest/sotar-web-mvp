<script lang="ts" setup>
import TheSidebar from '@/components/TheSidebar.vue'
import TheUserMenu from '@/components/TheUserMenu.vue'
</script>

<template>
  <div class="app-layout-dashboard">
    <TheSidebar />
    <TheUserMenu />
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.app-layout-dashboard {
  margin-left: var(--sidebar-len);
  background-color: var(--p-grey);
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow: hidden;
}
</style>
