<template>
  <div
    class="app-select app-select--wrapper"
    v-click-outside="handleFocusOut"
    ref="customSelectRef"
  >
    <div
      aria-haspopup="true"
      :aria-expanded="isExpanded"
      class="app-select__container"
      @click="toggleShowOptions"
      :style="{ height: expandableHeight }"
      :class="{
        'app-select__container--expanded': isExpanded,
        'app-select__container--error': error
      }"
    >
      <button type="button" class="app-select__visible" tabindex="0">
        <span
          class="app-select__placeholder"
          :class="{
            'app-select__placeholder--active':
              isExpanded || isSelected || isFocused
          }"
        >
          {{ placeholderTitle }}
        </span>
        <span class="app-select__value">
          {{ selectTitle }}
        </span>
        <SpriteIcon class="app-select__icon" name="arrow_down_device" />
      </button>
      <div ref="customSelectListRef" class="app-select__expandable">
        <button
          type="button"
          tabindex="0"
          class="app-select__option"
          v-for="option in options"
          :key="option.id"
          @click.stop="handleSelectOption(option)"
        >
          {{ option.title }}
        </button>
      </div>
    </div>
    <div v-if="error && errorMessage" class="app-select__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref
} from 'vue'
import SpriteIcon from '@lib/components/SpriteIcon.vue'
import getCustomInputError from '@lib/validations/customErrors'

export interface IOption {
  id: string
  title: string
  value: object | null
}

export default defineComponent({
  name: 'AppSelect',
  components: {
    SpriteIcon
  },
  props: {
    modelValue: {
      type: [Object, Number, String] as PropType<
        IOption | string | number | null
      >,
      required: false
    },
    options: {
      type: Array as PropType<Array<IOption>>,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select'
    },
    error: {
      type: Boolean
    },
    customError: {
      type: [Object, String]
    },
    required: {
      type: Boolean,
      default: false
    },
    reduce: {
      type: Function,
      default: (option: unknown) => option
    },
    label: {
      type: String,
      default: 'title'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isExpanded = ref<boolean>(false)
    const isSelected = computed(() => !!props.modelValue)
    const isFocused = ref<boolean>(false)
    const customSelectListRef = ref<HTMLElement>()
    const customSelectRef = ref<HTMLElement>()

    const distanceToWindow = ref<number>(0)
    const windowSizes = ref({
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight
    })

    const expandableHeight = computed(() => {
      let resultValue = 0

      if (
        customSelectListRef?.value?.getBoundingClientRect() &&
        isExpanded.value
      ) {
        // Число 60 взято, исходя из высоты селекта в обычном состоянии + отступы
        const offset =
          customSelectListRef.value?.getBoundingClientRect()?.height + 60

        offset >= 200 ? (resultValue = 200) : (resultValue = offset)

        if (resultValue > distanceToWindow.value)
          resultValue = distanceToWindow.value

        return resultValue + 'rem'
      }

      return '40rem'
    })

    const errorMessage = computed(() => {
      if (typeof props.customError === 'string') return props.customError
      return getCustomInputError(props.customError)
    })

    function toggleShowOptions(e: any) {
      if (customSelectRef?.value) {
        distanceToWindow.value =
          windowSizes.value.h - customSelectRef?.value.offsetTop - 52
      }

      isExpanded.value = !isExpanded.value
      isFocused.value = false
    }

    function handleFocusOut() {
      isExpanded.value = false
      isFocused.value = false
    }

    function handleFocusIn() {
      isFocused.value = true
    }

    function handleSelectOption(option: IOption) {
      emit('update:modelValue', props.reduce(option))
      handleFocusOut()
    }

    const placeholderTitle = computed(() => {
      return props.required ? `${props.placeholder}*` : props.placeholder
    })

    const selectTitle = computed(() => {
      const item = props.options.find(
        (option) =>
          JSON.stringify(props.reduce(option)) ===
          JSON.stringify(props.modelValue)
      )

      return item ? item[props.label as keyof typeof item] : ''
    })

    onMounted(() => {
      window.addEventListener('resize', getDimensions)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', getDimensions)
    })

    const getDimensions = () => {
      windowSizes.value = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
    return {
      toggleShowOptions,
      handleSelectOption,
      expandableHeight,
      customSelectListRef,
      customSelectRef,
      handleFocusOut,
      handleFocusIn,
      isFocused,
      errorMessage,
      isExpanded,
      isSelected,
      placeholderTitle,
      selectTitle
    }
  }
})
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 6rem;
}

*::-webkit-scrollbar-track {
  background-color: $gray-color-6;
}

*::-webkit-scrollbar-thumb {
  background-color: $gray-color-5;
}

.app-select {
  position: relative;
  width: 100%;
  height: 40rem;

  &__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__container {
    width: 100%;
    background: #ffffff;
    border: 1rem solid $gray-color-5;
    border-radius: 8rem;
    padding: 0 16rem;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    height: inherit;
    z-index: $z-low-1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 0 16rem 0;

    &:focus,
    &:focus-within {
      outline: none;
      border-color: $blue-color-3;

      .app-select__placeholder {
        color: $blue-color-3;
      }

      &.app-select__container--error {
        border-color: $red-color-1;

        .app-select__placeholder {
          color: $red-color-1;
        }
      }
    }

    &--expanded {
      border-color: $blue-color-3;

      .app-select__icon {
        color: $black-color;
      }
    }

    &--error {
      border-color: $red-color-1;

      &.app-select__container--expanded .app-select__placeholder--active {
        color: $red-color-1;
      }
    }

    &--expanded {
      z-index: $z-low-10;
      max-height: 200rem;
      padding-bottom: 11rem;

      .app-select__expandable {
        visibility: visible;
        overflow-y: auto;
        opacity: 1;
        margin: 10rem 0 6rem 0;
      }

      .app-select__placeholder {
        color: $blue-color-3;
      }

      .app-select__icon {
        transform: rotate(180deg);
      }
    }
  }

  &__error {
    font-size: 12rem;
    position: absolute;
    top: 100%;
    left: 18rem;
    z-index: $z-default;
    color: $red-color-1;
  }

  &__visible {
    border-radius: inherit;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10rem;
    transition: inherit;
    width: 100%;
    margin-top: 6rem;
    cursor: pointer;
    position: relative;
    outline: none;
  }

  &__placeholder {
    transition: inherit;
    position: absolute;
    left: 0;
    top: 3rem;
    flex-shrink: 1;
    border: none;
    background: $color-white;
    color: $gray-color-4;
    border-radius: 15rem;
    font-weight: 400;
    line-height: 130%;
    width: max-content;
    padding: 0 4rem;

    &--active {
      transform: translateY(-100%);
      font-size: 14rem;
    }
  }

  &__icon {
    width: 24rem;
    height: 24rem;
    color: $gray-color-5;
    transition: inherit;
  }

  &__expandable {
    width: 100%;
    visibility: hidden;
    display: flex;
    flex-flow: column nowrap;
    flex-shrink: 1;
    flex-grow: 0;
    opacity: 0;
  }

  &__option {
    transition: color 0.24s ease-in-out;
    cursor: pointer;
    padding: 5rem 0;
    min-height: 31rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;

    &:focus-visible {
      outline: 2rem solid $blue-color-3;
      outline-offset: -2rem;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
      min-height: 26rem;
    }

    &:hover {
      color: $blue-color-3;
    }
  }
}
</style>
