<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <div class="wrapper">
      <main class="content" role="main">
        <RouterView />
      </main>
    </div>
  </AppLayout>
  <div class="dialogs" id="dialogs"></div>
</template>

<style lang="postcss" scoped>
.content {
  height: 100%;
  position: relative;
}

.wrapper {
  flex: 1;
}
</style>
