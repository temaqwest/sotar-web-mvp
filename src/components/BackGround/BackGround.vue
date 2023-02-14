<script lang="ts" setup>
interface BackGroundProps {
  bg: string
  type: 'full' | 'half-top' | 'half-bottom'
}

const props = defineProps<BackGroundProps>()

const typeClass = () => 'back-ground--type-' + props.type
const bgStyle = () => `var(${props.bg})`
</script>

<template>
  <div
    class="back-ground"
    :style="{ background: bgStyle() }"
    :class="typeClass()"
  ></div>
</template>

<style lang="postcss">
.back-ground {
  position: absolute;

  &--type-full {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>
