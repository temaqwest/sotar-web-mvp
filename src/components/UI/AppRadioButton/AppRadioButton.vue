<template>
  <label class="app-radio option">
    <input
      :id="radioID"
      type="radio"
      class="app-radio__input"
      :value="value"
      :name="name"
      :checked="checked"
      @input="updateData(value)"
    />
    <span class="app-radio__box"></span>
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface AppRadioEmits {
  (e: 'update:modelValue', value: any): void
}

interface AppRadioProps {
  label: string
  value: string | number
  name: string
  checked?: boolean
}

const emit = defineEmits<AppRadioEmits>()
const props = defineProps<AppRadioProps>()
const radioID = computed(() => 'radio_' + String(props.value))

const updateData = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<style lang="postcss" scoped>
.option {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.app-radio {
  padding-left: 24rem;
  transition: color 0.2s ease-in-out;

  cursor: pointer;
  font-weight: 400;
  font-size: 16rem;
  line-height: 130%;
  letter-spacing: 0.2rem;
  color: $black-color;

  &:hover {
    color: $blue-color-3;

    .app-radio__box {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.74609 11.7539C4.94141 12.9258 6.35938 13.5117 8 13.5117C9.64062 13.5117 11.0469 12.9258 12.2188 11.7539C13.4141 10.5586 14.0117 9.14062 14.0117 7.5C14.0117 5.85938 13.4141 4.45312 12.2188 3.28125C11.0469 2.08594 9.64062 1.48828 8 1.48828C6.35938 1.48828 4.94141 2.08594 3.74609 3.28125C2.57422 4.45312 1.98828 5.85938 1.98828 7.5C1.98828 9.14062 2.57422 10.5586 3.74609 11.7539ZM2.69141 2.22656C4.16797 0.75 5.9375 0.0117188 8 0.0117188C10.0625 0.0117188 11.8203 0.75 13.2734 2.22656C14.75 3.67969 15.4883 5.4375 15.4883 7.5C15.4883 9.5625 14.75 11.332 13.2734 12.8086C11.8203 14.2617 10.0625 14.9883 8 14.9883C5.9375 14.9883 4.16797 14.2617 2.69141 12.8086C1.23828 11.332 0.511719 9.5625 0.511719 7.5C0.511719 5.4375 1.23828 3.67969 2.69141 2.22656ZM5.32812 4.86328C6.07812 4.11328 6.96875 3.73828 8 3.73828C9.03125 3.73828 9.91016 4.11328 10.6367 4.86328C11.3867 5.58984 11.7617 6.46875 11.7617 7.5C11.7617 8.53125 11.3867 9.42188 10.6367 10.1719C9.91016 10.8984 9.03125 11.2617 8 11.2617C6.96875 11.2617 6.07812 10.8984 5.32812 10.1719C4.60156 9.42188 4.23828 8.53125 4.23828 7.5C4.23828 6.46875 4.60156 5.58984 5.32812 4.86328Z' fill='%232B72EE'/%3E%3C/svg%3E%0A");
    }
  }

  &__input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: absolute;

    &:checked + .app-radio__box {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.74609 11.7539C4.94141 12.9258 6.35938 13.5117 8 13.5117C9.64062 13.5117 11.0469 12.9258 12.2188 11.7539C13.4141 10.5586 14.0117 9.14062 14.0117 7.5C14.0117 5.85938 13.4141 4.45312 12.2188 3.28125C11.0469 2.08594 9.64062 1.48828 8 1.48828C6.35938 1.48828 4.94141 2.08594 3.74609 3.28125C2.57422 4.45312 1.98828 5.85938 1.98828 7.5C1.98828 9.14062 2.57422 10.5586 3.74609 11.7539ZM2.69141 2.22656C4.16797 0.75 5.9375 0.0117188 8 0.0117188C10.0625 0.0117188 11.8203 0.75 13.2734 2.22656C14.75 3.67969 15.4883 5.4375 15.4883 7.5C15.4883 9.5625 14.75 11.332 13.2734 12.8086C11.8203 14.2617 10.0625 14.9883 8 14.9883C5.9375 14.9883 4.16797 14.2617 2.69141 12.8086C1.23828 11.332 0.511719 9.5625 0.511719 7.5C0.511719 5.4375 1.23828 3.67969 2.69141 2.22656ZM5.32812 4.86328C6.07812 4.11328 6.96875 3.73828 8 3.73828C9.03125 3.73828 9.91016 4.11328 10.6367 4.86328C11.3867 5.58984 11.7617 6.46875 11.7617 7.5C11.7617 8.53125 11.3867 9.42188 10.6367 10.1719C9.91016 10.8984 9.03125 11.2617 8 11.2617C6.96875 11.2617 6.07812 10.8984 5.32812 10.1719C4.60156 9.42188 4.23828 8.53125 4.23828 7.5C4.23828 6.46875 4.60156 5.58984 5.32812 4.86328Z' fill='%232B72EE'/%3E%3C/svg%3E%0A");
    }
  }

  &__box {
    position: absolute;
    width: 15rem;
    height: 15rem;
    margin-left: -24rem;
    transition: all 0.2s ease-in-out;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.74609 11.7539C4.94141 12.9258 6.35938 13.5117 8 13.5117C9.64062 13.5117 11.0469 12.9258 12.2188 11.7539C13.4141 10.5586 14.0117 9.14062 14.0117 7.5C14.0117 5.85938 13.4141 4.45312 12.2188 3.28125C11.0469 2.08594 9.64062 1.48828 8 1.48828C6.35938 1.48828 4.94141 2.08594 3.74609 3.28125C2.57422 4.45312 1.98828 5.85938 1.98828 7.5C1.98828 9.14062 2.57422 10.5586 3.74609 11.7539ZM2.69141 2.22656C4.16797 0.75 5.9375 0.0117188 8 0.0117188C10.0625 0.0117188 11.8203 0.75 13.2734 2.22656C14.75 3.67969 15.4883 5.4375 15.4883 7.5C15.4883 9.5625 14.75 11.332 13.2734 12.8086C11.8203 14.2617 10.0625 14.9883 8 14.9883C5.9375 14.9883 4.16797 14.2617 2.69141 12.8086C1.23828 11.332 0.511719 9.5625 0.511719 7.5C0.511719 5.4375 1.23828 3.67969 2.69141 2.22656Z' fill='%23656565'/%3E%3C/svg%3E%0A");
  }
}
</style>
