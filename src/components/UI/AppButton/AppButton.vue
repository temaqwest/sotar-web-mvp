<template>
  <button class="app-button" :class="classes">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface AppButtonProps {
  color?: 'orange' | 'black'
  size?: 'large' | 'normal' | 'small'
  border?: 'rounded' | 'square'
  text?: 'bold' | 'regular'
  variant?: 'regular' | 'clear'
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  color: 'black',
  size: 'normal',
  border: 'square',
  text: 'bold',
  variant: 'regular',
})

const classes = computed(() => {
  const options = ['color', 'size', 'border', 'text', 'variant']

  return options.map(
    (option: string) =>
      `app-button--${option}-${props[option as keyof AppButtonProps]}`
  )
})
</script>

<style lang="postcss" scoped>
.app-button {
  @apply text-white cursor-pointer;

  &--border-rounded {
    @apply rounded;
  }

  &--variant {
    &-clear {
      padding: 0 !important;
      margin: 0 !important;
      display: block !important;
      background: transparent !important;
    }
  }

  &--color {
    &-orange {
      @apply bg-orange-600;

      &:hover {
        @apply bg-orange-800;
      }
    }

    &-black {
      @apply bg-black;

      &:hover {
        @apply bg-white text-black;
      }
    }
  }

  &--text {
    &-bold {
      @apply font-bold;
    }

    &-regular {
      @apply font-normal;
    }
  }

  &--size {
    &-normal {
      @apply text-base py-2 px-5;
    }

    &-large {
      @apply text-lg py-2.5 px-7;
    }

    &-small {
      @apply text-sm py-1 px-3;
    }
  }
}
</style>
