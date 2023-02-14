<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <main class="content" role="main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="postcss" scoped>
.content {
  min-height: 100vh;
  position: relative;
}
</style>
