<template>
  <div class="app-avatar" :style="{ width: avatarSize, height: avatarSize }">
    <slot class="app-avatar__inner"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface AppAvatarProps {
  size?: number
}

const props = withDefaults(defineProps<AppAvatarProps>(), {
  size: 48,
})

const avatarSize = computed(() => `${props.size}px`)
</script>

<style lang="postcss">
.app-avatar {
  box-sizing: border-box;
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  border-color: var(--p-orange);
  border-width: 0.15rem;

  img {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    object-fit: cover;
  }

  span {
    text-transform: uppercase;
  }
}
</style>
