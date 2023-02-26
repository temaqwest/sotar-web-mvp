<template>
  <Teleport to="#dialogs" v-if="isTeleportContainerMounted">
    <Transition name="overlay-fade">
      <div class="dialog" v-show="show" :class="$attrs.class">
        <div class="dialog__overlay" @click.self="closeDialogWindow">
          <Transition name="toggle-dialog">
            <div class="dialog__content" v-show="show">
              <AppButton
                class="dialog__close-button"
                title="Закрыть"
                variant="clear"
                @click="closeDialogWindow"
              >
                <AppIcon name="close" />
              </AppButton>
              <div class="dialog__header" v-if="title">
                <div class="dialog__header-title">{{ title }}</div>
              </div>
              <slot></slot>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref, withDefaults } from 'vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import AppIcon from '@/components/UI/AppIcon/AppIcon.vue'

interface IDialogProps {
  show?: boolean
  title?: string
}

interface IDialogEmits {
  (e: 'update:show', value: boolean): void
}

const props = withDefaults(defineProps<IDialogProps>(), {
  show: false,
})

const emit = defineEmits<IDialogEmits>()

const isTeleportContainerMounted = ref(false)

function closeDialogWindow() {
  emit('update:show', false)
}

onMounted(() => {
  isTeleportContainerMounted.value = true
})
</script>

<style lang="postcss" scoped>
.dialog {
  @apply fixed top-0 bottom-0 right-0 left-0 z-10 backdrop-blur;

  &__overlay {
    @apply flex justify-center items-center h-full w-full bg-black/40;
  }

  &__content {
    @apply flex relative items-center w-full flex-col flex-nowrap;
    max-width: 600px;
    min-height: 200px;
    background-color: var(--s-grey);
    color: var(--color-white);
  }

  &__header {
    font-size: 1.6rem;
    padding: 1.2rem;
    width: 100%;
    user-select: none;

    &-title {
      color: var(--color-white);
      @apply font-bold;
    }
  }

  &__close-button {
    z-index: 2;
    position: absolute;
    top: 20px;
    right: 20px;

    &:hover {
      @apply text-orange-800;
    }
  }
}
</style>
