<template>
  <input
    ref="inputRef"
    :value="modelValue"
    @change="handleEmmit"
    @input="handleEmmit"
    :class="classes"
    class="app-input border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
    :type="inputType"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface AppInputProps {
  modelValue: string | number | null
  placeholder: string
  required?: boolean
  inputType?: string
  size: 'large' | 'normal' | 'small'
  border: 'rounded' | 'square'
  text: 'bold' | 'regular'
}

interface AppInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'icon-click'): void
}

const props = withDefaults(defineProps<AppInputProps>(), {
  required: false,
  inputType: 'text',
  placeholder: '',
  size: 'normal',
  text: 'regular',
  border: 'square',
})
const emit = defineEmits<AppInputEmits>()

const inputRef = ref<HTMLInputElement>()

const classes = computed(() => {
  const options = ['size', 'border', 'text']

  return options.map(
    (option: string) =>
      `app-input--${option}-${props[option as keyof AppInputProps]}`
  )
})

const handleEmmit = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<style lang="postcss" scoped>
.app-input {
  @apply relative block appearance-none px-3 py-2;

  &--size {
    &-large {
      @apply text-lg;
    }

    &-normal {
      @apply text-base;
    }

    &-small {
      @apply text-sm;
    }
  }

  &--border {
    &-rounded {
      @apply rounded;
    }

    &-square {
    }
  }

  &--text {
    &-bold {
      @apply font-bold;
    }

    &-normal {
      @apply font-normal;
    }
  }
}
</style>
