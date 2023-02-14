<script lang="ts" setup>
import { computed } from 'vue'
import * as Sprite from '@/assets/svg/sprite.svg'

interface AppIconProps {
  name: string
  iconWidth: string
  iconHeight: string
  iconColor: string
}

const props = defineProps<AppIconProps>()

const iconPath = computed(() => Sprite.default + '#' + props.name)
const iconStyle = computed(() => ({
  width: props.iconWidth,
  height: props.iconHeight,
  color: props.iconColor,
}))
</script>

<template>
  <svg class="icon" :style="iconStyle">
    <use :xlink:href="iconPath" class="icon__use" />
  </svg>
</template>

<style lang="postcss" scoped>
.icon {
  flex: none;
  width: 24px;
  height: 24px;
}
</style>
