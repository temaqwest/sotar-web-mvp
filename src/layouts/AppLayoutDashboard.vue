<script lang="ts" setup>
import TheSidebar from '@/components/TheSidebar.vue'
</script>

<template>
  <div class="app-layout-dashboard">
    <TheSidebar />
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.app-layout-dashboard {
  margin-left: var(--sidebar-len);
  background-color: var(--p-grey);
}
</style>
