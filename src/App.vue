<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <!--    <RouterView name="header" />-->
    <main class="content" role="main">
      <RouterView />
    </main>
  </div>
  <div class="dialogs" id="dialogs"></div>
</template>

<style lang="postcss" scoped>
.content {
  min-height: 100vh;
  position: relative;
}
</style>
